"use client";

import { useState, useEffect, useRef } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import {
  Blend,
  ChevronLeft,
  ChevronDown,
  Crop,
  Info,
  Pencil,
  Trash2,
  Wand2,
  Image,
  Ban,
  PencilRuler,
  ScissorsSquare,
  Square,
  RectangleHorizontal,
  RectangleVertical,
  WandSparkles,
} from "lucide-react";

import Container from "@/components/_components/Container";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CldImageProps, getCldImageUrl } from "next-cloudinary";
import CldImage from "@/components/cloudinary/CldImage";
import { apolloClient } from "@/clients/Apollo";
import { useQueryClient } from "@tanstack/react-query";
import { CloudinaryResource } from "./MediaGallery";
import { useCurrentUser } from "@/hooks/user";
import { toast } from "@/hooks/use-toast";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import { addCommas, formatBytes } from "@/lib/utils";

interface Deletion {
  state: string;
}

type Transformation = Omit<CldImageProps, "src" | "alt">;
const MediaViewer = ({ resource }: { resource: CloudinaryResource }) => {
  const queryclient = useQueryClient();
  const sheetFiltersRef = useRef<HTMLDivElement | null>(null);
  const sheetInfoRef = useRef<HTMLDivElement | null>(null);
  const sheetPromptRef = useRef<HTMLDivElement | null>(null);
  const { user } = useCurrentUser();
  const router = useRouter();

  // Sheet / Dialog UI state, basically controlling keeping them open or closed

  const [filterSheetIsOpen, setFilterSheetIsOpen] = useState(false);
  const [infoSheetIsOpen, setInfoSheetIsOpen] = useState(false);
  const [deletion, setDeletion] = useState<Deletion>();
  const [enhancement, setEnhancement] = useState<string>();
  const [crop, setCrop] = useState<string>();
  const transformations: Transformation = {};
  const [filter, setFilter] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [version, setVersion] = useState(1);
  const [prompSheetIsOpen, setPrompSheetIsOpen] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    setEnhancement(undefined);
    setFilter(undefined);
    setCrop(undefined);
  }, []);

  if (enhancement === "restore") {
    transformations.restore = true;
  } else if (enhancement === "improve") {
    transformations.improve = true;
  } else if (enhancement === "remove-background") {
    transformations.removeBackground = true;
  }

  if (crop === "square") {
    if (resource.width > resource.height) {
      transformations.height = resource.height;
    } else {
      transformations.width = resource.height;
    }
    transformations.crop = {
      source: true,
      type: "fill",
    };
  } else if (crop === "landscape") {
    transformations.height = Math.floor(resource.width / (16 / 9));

    transformations.crop = {
      source: true,
      type: "fill",
    };
  } else if (crop === "potrait") {
    transformations.width = Math.floor(resource.height / (16 / 9));

    transformations.crop = {
      source: true,
      type: "fill",
    };
  }

  if (
    typeof filter === "string" &&
    ["grayscale", "sepia", "blur", "pixelate"].includes(filter)
  ) {
    transformations[filter as keyof Transformation] = true;
  } else if (typeof filter === "string" && ["sizzle"].includes(filter)) {
    transformations.art = filter;
  }

  const canvasHeight = transformations.height || resource.height;
  const canvasWidth = transformations.width || resource.width;

  const isSquare = canvasHeight === canvasWidth;
  const isLandscape = canvasWidth > canvasHeight;
  const isPortrait = canvasHeight > canvasWidth;

  const imgStyles: Record<string, string | number> = {
    maxWidth: "90%",
    maxHeight: "90vh",
    margin: "auto",
  };

  if (isLandscape) {
    imgStyles.maxWidth = resource.width;
    imgStyles.width = "100%";
    imgStyles.height = "auto";
  } else if (isPortrait || isSquare) {
    imgStyles.maxHeight = resource.height;
    imgStyles.height = "100vh";
    imgStyles.width = "auto";
  }

  /**
   * closeMenus
   * @description Closes all panel menus and dialogs
   */

  function closeMenus() {
    setFilterSheetIsOpen(false);
    setInfoSheetIsOpen(false);
    setDeletion(undefined);
  }

  function discardChanges() {
    setEnhancement(undefined);
    setCrop(undefined);
    setFilter(undefined);
  }

  /**
   * handleOnDeletionOpenChange
   */

  function handleOnDeletionOpenChange(isOpen: boolean) {
    // Reset deletion dialog if the user is closing it
    if (!isOpen) {
      setDeletion(undefined);
    }
  }

  async function handleOnSave() {
    setLoading(true);
    const url = getCldImageUrl({
      width: resource.width,
      height: resource.height,
      src: resource.public_id,
      format: "default",
      quality: "default",
      ...transformations,
    });

    await fetch(url);

    await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, publicId: resource.public_id }),
    });

    setLoading(false);
    closeMenus();
    toast({
      variant: "success",
      title: "Success",
      description: "Image has been saved successfully",
      duration: 2000,
    });
    await apolloClient.resetStore();
    await queryclient.invalidateQueries({
      queryKey: ["allMedia"],
    });
    // discardChanges();
    setVersion(Date.now());
  }

  async function handleOnDelete() {
    setDeleteLoading(true);
    await fetch("/api/delete", {
      method: "POST",
      body: JSON.stringify({
        publicId: [resource.public_id],
      }),
    });

    setDeleteLoading(false);
    await apolloClient.resetStore();
    await queryclient.invalidateQueries({
      queryKey: ["AllMedia"],
    });

    toast({
      variant: "success",
      description: "Image deleted successfully",
      duration: 2000,
    });
    router.push("/media");
  }

  async function handleOnSaveCopy() {
    setLoading(true);
    const url = getCldImageUrl({
      width: resource.width,
      height: resource.height,
      src: resource.public_id,
      format: "default",
      quality: "default",
      ...transformations,
    });

    await fetch(url);

    const { results } = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, folder: user.id }),
    }).then((res) => res.json());

    setLoading(false);
    router.push(`/image/${results.asset_id}`);
    closeMenus();
    toast({
      variant: "success",
      title: "Success",
      description: "Image has been saved successfully",
      duration: 2000,
    });
    await apolloClient.resetStore();
    await queryclient.invalidateQueries({
      queryKey: ["allMedia"],
    });
    // discardChanges();
    setVersion(Date.now());
  }
  // Listen for clicks outside of the panel area and if determined
  // to be outside, close the panel. This is marked by using
  // a data attribute to provide an easy way to reference it on
  // multiple elements

  useEffect(() => {
    document.body.addEventListener("click", handleOnOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleOnOutsideClick);
    };
  }, []);

  function handleOnOutsideClick(event: MouseEvent) {
    const excludedElements = Array.from(
      document.querySelectorAll('[data-exclude-close-on-click="true"]')
    );
    const clickedExcludedElement =
      excludedElements.filter((element) =>
        event.composedPath().includes(element)
      ).length > 0;

    if (!clickedExcludedElement) {
      closeMenus();
    }
  }

  return (
    <div className="h-screen bg-black px-0">
      {/** Modal for deletion */}

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
              {deleteLoading ? (
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

      <Sheet
        modal={false}
        open={prompSheetIsOpen}
        onOpenChange={() => setPrompSheetIsOpen(false)}
      >
        <SheetContent
          ref={sheetPromptRef}
          className="w-full sm:w-3/4 grid grid-rows-[auto_1fr_auto] bg-zinc-800 text-white border-0"
          data-exclude-close-on-click={true}
        >
          <VisuallyHidden.Root>
            <SheetTitle className="text-zinc-200 font-semibold">
              Prompt
            </SheetTitle>
          </VisuallyHidden.Root>
          <SheetHeader className="my-4">
            <SheetTitle className="text-zinc-200 font-semibold">
              Prompt
            </SheetTitle>
          </SheetHeader>

          <SheetFooter>
            <Button
              variant="outline"
              className="w-full h-14 text-left justify-center items-center bg-transparent border-zinc-600"
              onClick={() => closeMenus()}
            >
              <span className="text-[1.01rem]">Close</span>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/** Edit panel for transformations and filters */}

      <Sheet
        modal={false}
        open={filterSheetIsOpen}
        onOpenChange={() => {
          console.log("hello", filterSheetIsOpen);
          if (filterSheetIsOpen) {
            setFilterSheetIsOpen(false);
          }
        }}
      >
        <SheetContent
          ref={sheetFiltersRef}
          className="w-full sm:w-3/4 grid grid-rows-[1fr_auto] bg-zinc-800 text-white border-0"
          data-exclude-close-on-click={true}
        >
          <VisuallyHidden.Root>
            <SheetTitle>Menu</SheetTitle>
          </VisuallyHidden.Root>
          <Tabs defaultValue="account">
            <TabsList className="grid grid-cols-3 w-full bg-transparent p-0">
              <TabsTrigger value="enhance">
                <Wand2 />
                <span className="sr-only">Enhance</span>
              </TabsTrigger>
              <TabsTrigger value="crop">
                <Crop />
                <span className="sr-only">Crop & Resize</span>
              </TabsTrigger>
              <TabsTrigger value="filters">
                <Blend />
                <span className="sr-only">Filters</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="enhance">
              <SheetHeader className="my-4">
                <SheetTitle className="text-zinc-400 text-sm font-semibold">
                  Enhancements
                </SheetTitle>
              </SheetHeader>
              <ul className="grid gap-2">
                <li>
                  <Button
                    variant="ghost"
                    className={`text-left justify-start w-full h-14 border-4 bg-zinc-700 ${
                      !enhancement ? "border-white" : "border-transparent"
                    }`}
                    onClick={() => setEnhancement(undefined)}
                  >
                    <Ban className="w-5 h-5 mr-3" />
                    <span className="text-[1.01rem]">None</span>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className={`text-left justify-start w-full h-14 border-4 bg-zinc-700 border-white ${
                      enhancement == "improve"
                        ? "border-white"
                        : "border-transparent"
                    }`}
                    onClick={() => setEnhancement("improve")}
                  >
                    <Wand2 className="w-5 h-5 mr-3" />
                    <span className="text-[1.01rem]">Improve</span>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className={`text-left justify-start w-full h-14 border-4 bg-zinc-700 border-white ${
                      enhancement == "restore"
                        ? "border-white"
                        : "border-transparent"
                    } `}
                    onClick={() => setEnhancement("restore")}
                  >
                    <PencilRuler className="w-5 h-5 mr-3" />
                    <span className="text-[1.01rem]">Restore</span>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className={`text-left justify-start w-full h-14 border-4 bg-zinc-700 ${
                      enhancement == "generative-fill"
                        ? "border-white"
                        : "border-transparent"
                    }`}
                    onClick={() => setEnhancement("generative-fill")}
                  >
                    <Ban className="w-5 h-5 mr-3" />
                    <span className="text-[1.01rem]">Generative Fill</span>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className={`text-left justify-start w-full h-14 border-4 bg-zinc-700 border-white ${
                      enhancement == "remove-background"
                        ? "border-white"
                        : "border-transparent"
                    } `}
                    onClick={() => setEnhancement("remove-background")}
                  >
                    <ScissorsSquare className="w-5 h-5 mr-3" />
                    <span className="text-[1.01rem]">Remove Background</span>
                  </Button>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="crop">
              <SheetHeader className="my-4">
                <SheetTitle className="text-zinc-400 text-sm font-semibold">
                  Cropping & Resizing
                </SheetTitle>
              </SheetHeader>
              <ul className="grid gap-2">
                <li>
                  <Button
                    variant="ghost"
                    className={`text-left justify-start w-full h-14 border-4 bg-zinc-700 ${
                      !crop ? "border-white" : "border-transparent"
                    }`}
                    onClick={() => setCrop(undefined)}
                  >
                    <Image className="w-5 h-5 mr-3" />
                    <span className="text-[1.01rem]">Original</span>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className={`text-left justify-start w-full h-14 border-4 bg-zinc-700 border-white ${
                      crop == "square" ? "border-white" : "border-transparent"
                    } `}
                    onClick={() => setCrop("square")}
                  >
                    <Square className="w-5 h-5 mr-3" />
                    <span className="text-[1.01rem]">Square</span>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className={`text-left justify-start w-full h-14 border-4 bg-zinc-700 border-white ${
                      crop == "landscape"
                        ? "border-white"
                        : "border-transparent"
                    }`}
                    onClick={() => setCrop("landscape")}
                  >
                    <RectangleHorizontal className="w-5 h-5 mr-3" />
                    <span className="text-[1.01rem]">LandScape</span>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className={`text-left justify-start w-full h-14 border-4 bg-zinc-700 border-white ${
                      crop == "potrait" ? "border-white" : "border-transparent"
                    }`}
                    onClick={() => setCrop("potrait")}
                  >
                    <RectangleVertical className="w-5 h-5 mr-3" />
                    <span className="text-[1.01rem]">Potrait</span>
                  </Button>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="filters">
              <SheetHeader className="my-4">
                <SheetTitle className="text-zinc-400 text-sm font-semibold">
                  Filters
                </SheetTitle>
              </SheetHeader>
              <ul className="grid grid-cols-2 gap-2 h-screen overflow-y-scroll">
                <li>
                  <button
                    className={`w-full border-4 ${
                      !filter ? "border-white" : "border-transparent"
                    }`}
                    onClick={() => setFilter(undefined)}
                  >
                    <CldImage
                      width={resource.width}
                      height={resource.height}
                      src={resource.public_id}
                      alt="No Filter"
                    />
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full border-4 ${
                      filter == "blur" ? "border-white" : "border-transparent"
                    }`}
                    onClick={() => setFilter("blur")}
                  >
                    <CldImage
                      width={resource.width}
                      height={resource.height}
                      src={resource.public_id}
                      blur
                      alt="Blur"
                    />
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full border-4 ${
                      filter == "pixelate"
                        ? "border-white"
                        : "border-transparent"
                    }`}
                    onClick={() => setFilter("pixelate")}
                  >
                    <CldImage
                      width={resource.width}
                      height={resource.height}
                      src={resource.public_id}
                      pixelate
                      alt="No Filter"
                    />
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full border-4 ${
                      filter == "sepia" ? "border-white" : "border-transparent"
                    }`}
                    onClick={() => setFilter("sepia")}
                  >
                    <CldImage
                      width={resource.width}
                      height={resource.height}
                      src={resource.public_id}
                      sepia
                      alt="sepia"
                    />
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full border-4 ${
                      filter == "sizzle" ? "border-white" : "border-transparent"
                    }`}
                    onClick={() => setFilter("sizzle")}
                  >
                    <CldImage
                      width={resource.width}
                      height={resource.height}
                      src={resource.public_id}
                      art="sizzle"
                      alt="sizzle"
                    />
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full border-4 ${
                      filter == "grayscale"
                        ? "border-white"
                        : "border-transparent"
                    }`}
                    onClick={() => setFilter("grayscale")}
                  >
                    <CldImage
                      width={resource.width}
                      height={resource.height}
                      src={resource.public_id}
                      grayscale
                      alt="grayscale"
                    />
                  </button>
                </li>
              </ul>
            </TabsContent>
          </Tabs>
          <SheetFooter className="gap-2 sm:flex-col">
            <div className="grid grid-cols-[1fr_4rem] gap-2">
              <Button
                variant="ghost"
                className="w-full h-14 text-left justify-center group items-center bg-blue-500 hover:bg-white hover:text-black"
                onClick={() => {
                  handleOnSave();
                }}
              >
                {loading ? (
                  <>
                    {" "}
                    <span>
                      <Loader
                        state
                        color="black"
                        className="group-hover:text-black "
                      />
                    </span>{" "}
                  </>
                ) : (
                  <span className="text-[1.01rem]">Save</span>
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full h-14 text-left justify-center items-center bg-blue-500 hover:bg-white hover:text-black"
                  >
                    <span className="sr-only">More Options</span>
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  data-exclude-close-on-click={true}
                >
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => {
                        handleOnSaveCopy();
                      }}
                    >
                      <span>Save as Copy</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button
              variant="outline"
              className="w-full h-14 text-left justify-center items-center bg-transparent border-zinc-600"
              onClick={() => {
                discardChanges();
                closeMenus();
              }}
            >
              <span className="text-[1.01rem]">Close</span>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/** Info panel for asset metadata */}

      <Sheet
        modal={false}
        open={infoSheetIsOpen}
        onOpenChange={() => setInfoSheetIsOpen(false)}
      >
        <SheetContent
          ref={sheetInfoRef}
          className="w-full sm:w-3/4 grid grid-rows-[auto_1fr_auto] bg-zinc-800 text-white border-0"
          data-exclude-close-on-click={true}
        >
          <VisuallyHidden.Root>
            <SheetTitle className="text-zinc-200 font-semibold">
              Info
            </SheetTitle>
          </VisuallyHidden.Root>
          <SheetHeader className="my-4">
            <SheetTitle className="text-zinc-200 font-semibold">
              Info
            </SheetTitle>
          </SheetHeader>
          <div>
            <ul>
              <li className="mb-3">
                <strong className="block text-xs font-normal text-zinc-400 mb-1">
                  Name
                </strong>
                <span className="flex gap-4 items-center text-zinc-100">
                  {resource.display_name}
                </span>
              </li>
              <li className="mb-3">
                <strong className="block text-xs font-normal text-zinc-400 mb-1">
                  Date Created
                </strong>
                <span className="flex gap-4 items-center text-zinc-100">
                  {new Date(resource.created_at).toLocaleDateString()}
                </span>
              </li>
              <li className="mb-3">
                <strong className="block text-xs font-normal text-zinc-400 mb-1">
                  Height
                </strong>
                <span className="flex gap-4 items-center text-zinc-100">
                  {addCommas(resource.height)}
                </span>
              </li>
              <li className="mb-3">
                <strong className="block text-xs font-normal text-zinc-400 mb-1">
                  Width
                </strong>
                <span className="flex gap-4 items-center text-zinc-100">
                  {addCommas(resource.width)}
                </span>
              </li>
              <li className="mb-3">
                <strong className="block text-xs font-normal text-zinc-400 mb-1">
                  Format
                </strong>
                <span className="flex gap-4 items-center text-zinc-100">
                  {resource.format}
                </span>
              </li>
              <li className="mb-3">
                <strong className="block text-xs font-normal text-zinc-400 mb-1">
                  Size
                </strong>
                <span className="flex gap-4 items-center text-zinc-100">
                  {formatBytes(resource.bytes)}
                </span>
              </li>

              <li className="mb-3">
                <strong className="block text-xs font-normal text-zinc-400 mb-1">
                  Tags
                </strong>
                <span className="flex gap-4 items-center text-zinc-100">
                  {resource?.tags?.join(",")}
                </span>
              </li>
            </ul>
          </div>
          <SheetFooter>
            <Button
              variant="outline"
              className="w-full h-14 text-left justify-center items-center bg-transparent border-zinc-600"
              onClick={() => closeMenus()}
            >
              <span className="text-[1.01rem]">Close</span>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/** Asset management navbar */}

      <Container className="fixed z-10 top-0 left-0 w-full h-16 flex items-center justify-between gap-4 bg-gradient-to-b from-black">
        <div className="flex items-center gap-4">
          <ul>
            <li>
              <Link
                href="/media"
                className={`${buttonVariants({ variant: "ghost" })} text-white`}
              >
                <ChevronLeft className="h-6 w-6" />
                Back
              </Link>
            </li>
          </ul>
        </div>
        <ul className="flex items-center gap-4">
          <li>
            <Button
              variant="ghost"
              className="text-white"
              onClick={() => setFilterSheetIsOpen(true)}
            >
              <Pencil className="h-6 w-6" />
              <span className="sr-only">Edit</span>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className="text-white"
              onClick={() => setPrompSheetIsOpen(true)}
            >
              <WandSparkles className="h-6 w-6" />
              <span className="sr-only">Prompt</span>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className="text-white"
              onClick={() => setInfoSheetIsOpen(true)}
            >
              <Info className="h-6 w-6" />
              <span className="sr-only">Info</span>
            </Button>
          </li>
          <li>
            <Button
              variant="destructive"
              className="text-white"
              onClick={() => setDeletion({ state: "confirm" })}
            >
              <Trash2 className="h-6 w-6" />
              <span className="sr-only">Delete</span>
            </Button>
          </li>
        </ul>
      </Container>

      {/** Asset viewer */}

      <div className="relative flex justify-center items-center align-center w-full h-full">
        {enhancement != "generative-fill" ? (
          <CldImage
            key={`${JSON.stringify(transformations)}-${version}`}
            className="object-contain"
            width={resource.width}
            height={resource.height}
            src={resource.url}
            alt="Cloudinary Logo"
            style={imgStyles}
            {...transformations}
          />
        ) : (
          <CldImage
            key={`${JSON.stringify(transformations)}-${version}`}
            className="object-contain"
            width={resource.width}
            height={resource.height}
            src={resource.url}
            alt="Cloudinary Logo"
            style={imgStyles}
            {...transformations}
            crop={"pad"}
            fillBackground
          />
        )}
      </div>
    </div>
  );
};

export default MediaViewer;
