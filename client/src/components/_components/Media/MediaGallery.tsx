"use client";

import { useEffect, useRef, useState } from "react";
import {
  Plus,
  X,
  Save,
  Delete,
  DeleteIcon,
  RecycleIcon,
  Trash2,
  Album,
  ArrowDownToLine,
} from "lucide-react";
import Container from "@/components/_components/Container";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import UploadButton from "../../cloudinary/UploadButton";
import MediaBlock from "./MediaBlock";
import { Media, User } from "@/gql/graphql";
import { useGetAllMedia } from "@/hooks/media";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import CldImage from "@/components/cloudinary/CldImage";
import { getAnimation, getCollage } from "@/lib/creations";
import { toast } from "@/hooks/use-toast";
import { apolloClient } from "@/clients/Apollo";
import { QueryObserverResult, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/ui/loader";
import { useCurrentUser } from "@/hooks/user";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addToAlbumMutation } from "@/graphql/mutation/media";
import UploadImage from "@/components/cloudinary/upload/upload-image";

export interface CloudinaryResource {
  asset_id?: string;
  public_id: string;
  format: string;
  resource_type: string;
  type: string;
  bytes: number;
  display_name?: string;
  width: number;
  height: number;
  created_at: string;
  folder?: string;
  url: string;
  tags?: Array<string>;
  secure_url: string;
}

interface MediaGalleryProps {
  user: User;
}

interface Creation {
  state: string;
  url: string;
  type: string;
}

interface Deletion {
  state: string;
}

const MediaGallery = ({
  media,
  type,
  album,
}: {
  media: Media[];
  type: string;
  album?: string;
}) => {
  const [selected, setSelected] = useState<Array<string>>([]);
  const [creation, setCreation] = useState<Creation>();
  const [uiloading, setuiloading] = useState(false);
  const [albumName, setalbumName] = useState<string>("");
  const [ablumDialog, setablumDialog] = useState(false);
  // const [openUpload, setOpenUpload] = useState(false);

  const [user, setUser] = useState<User>();
  const { user: currentUser } = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const queryclient = useQueryClient();
  const [deletion, setDeletion] = useState<Deletion>();
  const { removeResources } = useGetAllMedia();
  // const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (currentUser) setUser(currentUser);
  }, [currentUser]);

  function getColumns(colIndex: number) {
    // console.log("In")
    return media?.filter(
      (resource: Media, ind: number) => ind % 5 === colIndex
    );
  }

  function handleOnCreateCollage() {
    const url = getCollage(selected);
    setCreation({
      state: "collage",
      url,
      type: "Collage",
    });
  }

  function handleOnCreatedAnimation() {
    const url = getAnimation(selected);
    setCreation({
      state: "created",
      url,
      type: "animation",
    });
  }

  async function handleOnCreateColorPop() {
    setCreation({
      state: "loading",
      url: "",
      type: "color-pop",
    });
    setuiloading(true);
    const { url } = await fetch("/api/creations/color-pop", {
      method: "POST",
      body: JSON.stringify({ publicId: selected[0] }),
    }).then((url) => url.json());
    console.log(url);
    setuiloading(false);
    setCreation({
      state: "created",
      url,
      type: "color-pop",
    });
  }

  async function handleOnSaveCreation() {
    if (typeof creation?.url !== "string") {
      return;
    }
    setLoading(true);

    await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: creation.url, folder: user?.id }),
    });
    setSelected([]);
    setCreation(undefined);
    setLoading(false);
    toast({
      title: "Success",
      description: "It has been saved successfully",
      duration: 2000,
    });
    await apolloClient.resetStore();
    await queryclient.invalidateQueries({
      queryKey: ["allMedia"],
    });
  }

  async function handleOnDelete() {
    setDeletion({ state: "loading" });

    await fetch("/api/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId: selected }),
    });
    removeResources(selected);
    setDeletion(undefined);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSelected([]);
    toast({
      description: "Images deleted successfully",
      duration: 2000,
    });
    await apolloClient.resetStore();
    await queryclient.invalidateQueries({
      queryKey: ["AllMedia"],
    });
    await queryclient.invalidateQueries({
      queryKey: ["AlbumMedia"],
    });
    await queryclient.invalidateQueries({
      queryKey: ["MediaByTags", ["creations"]],
    });
    await queryclient.invalidateQueries({
      queryKey: ["MediaByTags", ["uploads"]],
    });
    await queryclient.invalidateQueries({
      queryKey: ["MediaByTags", ["favourites"]],
    });
  }

  /**
   * handleOnClearSelection
   */

  function handleOnClearSelection() {
    setSelected([]);
  }

  /**
   * handleOnCreationOpenChange
   */

  function handleOnCreationOpenChange(isOpen: boolean) {
    if (!isOpen) {
      setCreation(undefined);
    }
  }
  function handleOnDeletionOpenChange(isOpen: boolean) {
    // Reset deletion dialog if the user is closing it
    if (!isOpen) {
      setDeletion(undefined);
    }
  }

  async function handleOnAddToAlbum() {
    setLoading(true);
    setLoading(false);
    setablumDialog(false);
    setSelected([]);
    await fetch("/api/album", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        albumName,
        publicIds: selected,
        userId: user?.id,
      }),
    });
    toast({
      description: "Images added to album successfully",
      duration: 2000,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await apolloClient.resetStore();
    await queryclient.invalidateQueries({
      queryKey: ["AlbumMedia"],
    });
    await queryclient.invalidateQueries({
      queryKey: ["AllAlbums"],
    });
  }

  if (!user) return null;

  return (
    <>
      <Dialog
        open={ablumDialog}
        onOpenChange={() => {
          setalbumName("");
          setablumDialog(false);
          setLoading(false);
        }}
      >
        <DialogContent data-exclude-close-on-click={true}>
          <DialogHeader>
            <DialogTitle>Add to album</DialogTitle>
            <DialogDescription>
              Type an album you want to move this image into
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="albumName" className="text-right">
                Album
              </Label>
              <Input
                id="albumName"
                defaultValue=""
                className="col-span-3"
                onChange={(e) => setalbumName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="justify-center sm:justify-center">
            {!loading ? (
              <Button
                onClick={() => {
                  setalbumName("");
                  handleOnAddToAlbum();
                }}
              >
                Add to album
              </Button>
            ) : (
              <>
                <Button className="justify-center items-center" disabled>
                  <Loader state color="black" className="w-4 h-4" />
                  Adding...
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!deletion?.state}
        onOpenChange={handleOnDeletionOpenChange}
      >
        <DialogContent data-exclude-close-on-click={true}>
          <DialogHeader>
            <DialogTitle className="text-center ">
              Are you sure you want to delete?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="justify-center sm:justify-center">
            <Button
              variant="destructive"
              onClick={() => {
                handleOnDelete();
              }}
            >
              {deletion?.state === "loading" ? (
                <>
                  <Loader state color="white" /> Deleting
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!creation} onOpenChange={handleOnCreationOpenChange}>
        <DialogContent>
          <VisuallyHidden>
            <DialogTitle>Save</DialogTitle>
          </VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Save your creation?</DialogTitle>
          </DialogHeader>
          {creation?.url && (
            <div>
              <CldImage
                width={1200}
                height={1200}
                src={creation.url}
                alt="creation"
                preserveTransformations
              />
            </div>
          )}
          {uiloading && (
            <>
              <div className="flex justify-center items-center h-full w-full">
                <Loader state color="black" />
              </div>
            </>
          )}
          <DialogFooter className="justify-end sm:justify-end">
            <Button onClick={handleOnSaveCreation}>
              {loading ? (
                <>
                  <Loader state color="black" />
                  Saving ...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save to Library
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* <div className="flex flex-col w-full"> */}
      {type !== "search" && (
        <Container className="sticky flex items-center justify-between min-h-20 mb-4 py-4 px-6 top-0 w-full bg-[#F9F9F9] dark:bg-gray-900 dark:bg-background/80 dark:backdrop-blur dark:supports-[backdrop-filter]:bg-background/70  z-20 text-black dark:text-white border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
          {selected.length > 0 ? (
            <>
              <div className="flex justify-between h-fit lg:px-0 items-center w-full">
                <div className="flex items-center justify-between gap-4">
                  <ul>
                    <li>
                      <Button
                        variant="ghost"
                        className="hover:bg-gray-700"
                        onClick={handleOnClearSelection}
                      >
                        <X className="h-6 w-6" />
                        <span className="sr-only">Clear Selected</span>
                      </Button>
                    </li>
                  </ul>
                  <p className="text-zinc-900 dark:text-zinc-100">
                    <span>{selected?.length} Selected</span>
                  </p>
                </div>
                <ul className="flex items-center gap-4">
                  <li>
                    <Button
                      variant="ghost"
                      className="hover:bg-gray-700"
                      onClick={() => setablumDialog(true)}
                    >
                      <Album width={30} height={30} />
                    </Button>
                  </li>

                  <li>
                    <Button
                      variant="ghost"
                      className="hover:bg-gray-700"
                      onClick={() => setDeletion({ state: "confirm" })}
                    >
                      <Trash2 width={30} height={30} />
                    </Button>
                  </li>
                  <li>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="hover:bg-gray-700">
                          <Plus className="h-6 w-6" />
                          <span className="sr-only">Create New</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuGroup>
                          {selected.length === 1 && (
                            <>
                              <DropdownMenuItem
                                onClick={handleOnCreatedAnimation}
                              >
                                <span>Animation</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={handleOnCreateColorPop}
                              >
                                <span>Color Pop</span>
                              </DropdownMenuItem>
                            </>
                          )}
                          {selected.length > 1 && (
                            <DropdownMenuItem onClick={handleOnCreateCollage}>
                              <span>Collage</span>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="flex w-full justify-between lg:px-0 items-center mx-4 ">
                {!album ? (
                  <h1>Welcome to Digital Memory Archive</h1>
                ) : (
                  <h1>{album}</h1>
                )}
                {(type === "uploads" || type === "media") && (
                  <>
                    <UploadButton userId={user?.id as string}></UploadButton>
                  </>
                )}
              </div>
            </>
          )}
        </Container>
      )}

      <Container>
        <form>
          {Array.isArray(media) && (
            <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-12 ">
              {[
                getColumns(0),
                getColumns(1),
                getColumns(2),
                getColumns(3),
                getColumns(4),
              ].map((column, index) => (
                <div key={index} className="flex flex-col gap-1">
                  {column?.map((resource: Media) => {
                    const isChecked = selected.includes(resource.public_id);
                    function handleOnSelectResource(checked: boolean) {
                      setSelected((prev) => {
                        if (checked) {
                          return Array.from(
                            new Set([...(prev || []), resource.public_id])
                          );
                        } else {
                          return prev.filter((id) => id !== resource.public_id);
                        }
                      });
                    }

                    const cloudinaryResource: CloudinaryResource = {
                      ...resource,
                      tags:
                        resource.tags?.filter(
                          (tag): tag is string => tag !== null
                        ) || [],
                    };

                    return (
                      <MediaBlock
                        key={resource.public_id}
                        resource={cloudinaryResource}
                        isChecked={isChecked}
                        type={type}
                        handleOnSelectResource={handleOnSelectResource}
                      />
                    );
                  })}
                </div>
              ))}
            </ul>
          )}
        </form>
      </Container>
      {/* </div> */}
      {/** Management navbar presented when assets are selected */}
    </>
  );
};

export default MediaGallery;
