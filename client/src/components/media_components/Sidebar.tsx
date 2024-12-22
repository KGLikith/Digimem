"use client";

import * as React from "react";
import {
  Album,
  Calendar,
  Clock,
  Folder,
  Heart,
  Image,
  LogOut,
  Search,
  Settings,
  Users,
  ImagePlus,
  Upload,
  Trash2,
  Plus,
} from "lucide-react";
import { UserButton, SignOutButton, useUser } from "@clerk/nextjs";
import clsx from "clsx";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useQuery } from "@apollo/client";
import { getAllAlbumsQuery } from "@/graphql/queries/media";
import { Album as AlbumType, GetAllAlbumsQuery } from "@/gql/graphql";
import { getAllAlbums } from "@/hooks/media";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { apolloClient } from "@/clients/Apollo";
import {
  addAlbumMutation,
  deleteAlbumMutation,
} from "@/graphql/mutation/media";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "../ui/loader";

const menuItems = [
  { icon: ImagePlus, label: "Media", href: "/media" },
  { icon: Upload, label: "Uploads", href: "/media/uploads" },
  { icon: Search, label: "Creations", href: "/media/creations" },
  { icon: Heart, label: "Favourites", href: "/media/favourites" },
  { icon: Search, label: "Search", href: "/media/search" },
  { icon: Album, label: "Albums", href: "/media/album" },
];

// const ablumMenuItems = [
//   { icon: ImagePlus, label: "Family", href: "/media/albums/family" },
// ];
export function MemoryArchiveSidebar() {
  const { user } = useUser();
  const { albums, refetch } = getAllAlbums();
  const [ablumMenuItems, setAlbumMenuItems] = React.useState<AlbumType[]>([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [albumName, setalbumName] = React.useState<string>("");
  const [albumId, setalbumId] = React.useState<string>("");
  const pathname = usePathname();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (albums) {
      setAlbumMenuItems(albums);
    }
  }, [albums]);

  async function addAlbum() {
    setLoading(true);
    await apolloClient.mutate({
      mutation: addAlbumMutation,
      variables: { title: albumName },
    });
    await apolloClient.resetStore();
    await queryClient.invalidateQueries({
      queryKey: ["AllAlbums"],
    });
    refetch();
    setLoading(false);
  }
  async function handleDeleteAlbum() {
    setLoading(true);
    console.log("delete album", albumId);
    await apolloClient.mutate({
      mutation: deleteAlbumMutation,
      variables: { name: albumName },
    });
    await apolloClient.resetStore();
    await queryClient.invalidateQueries({
      queryKey: ["AllAlbums"],
    });
    refetch();
    setLoading(false);
  }
  return (
    <>
      <Dialog
        open={deleteOpen}
        onOpenChange={() => {
          setalbumName("");
          setalbumId("");
          setDeleteOpen(false);
        }}
      >
        <DialogContent data-exclude-close-on-click={true}>
          <DialogHeader>
            <DialogTitle className="text-center ">
              Are you sure you want to delete this album
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="justify-center sm:justify-center">
            {!loading ? (
              <Button
                variant={"destructive"}
                onClick={() => {
                  handleDeleteAlbum();
                  setalbumName("");
                  setalbumId("");
                  setDeleteOpen(false);
                }}
              >
                Delete
              </Button>
            ) : (
              <>
                <Button className="justify-center items-center" disabled>
                  <Loader state color="black" className="w-4 h-4" />
                  Deleting...
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={dialogOpen}
        onOpenChange={() => {
          setDialogOpen(false);
          setalbumName("");
        }}
      >
        <DialogContent data-exclude-close-on-click={true}>
          <DialogHeader>
            <DialogTitle className="text-center ">Add an album</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4 flex-between">
              <Label htmlFor="albumName" className="text-center">
                Album Name
              </Label>
              <Input
                id="albumName"
                defaultValue=""
                className="col-span-3  "
                onChange={(e) => setalbumName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="justify-center sm:justify-center">
            {!loading ? (
              <Button
                onClick={() => {
                  addAlbum();
                  setDialogOpen(false);
                }}
              >
                Add
              </Button>
            ) : (
              <>
                <Button className="justify-center items-center" disabled>
                  <Loader state color="white" className="w-4 h-4" />
                  Adding...
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Sidebar className="border-r h-full flex flex-col">
        <SidebarHeader className="p-4">
          <h2 className="text-lg font-semibold">Memory Archive</h2>
        </SidebarHeader>
        <SidebarContent className="flex-grow">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <div key={item.label}>
                    {item.label === "Albums" ? (
                      <>
                        <Collapsible defaultOpen className="group/collapsible">
                          <SidebarGroup>
                            <SidebarGroupLabel asChild>
                              <CollapsibleTrigger>
                                <item.icon className="mr-2 h-4 w-4" />
                                <span>{item.label}</span>
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                              </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                              {ablumMenuItems.map((item: AlbumType) => {
                                return (
                                  <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton asChild>
                                      <div className="w-full flex items-center justify-between">
                                        <Link
                                          href={`/media/albums/${item.name}`}
                                          className={clsx(
                                            "flex items-center justify-between w-full rounded-md px-3 py-2 hover:bg-muted hover:text-primary",
                                            pathname ===
                                              `/media/albums/${item.name}`
                                              ? "bg-muted text-primary font-bold"
                                              : "text-muted-foreground"
                                          )}
                                        >
                                          <span
                                            className="w-fit cursor-pointer"
                                            onClick={() => {}}
                                          >
                                            {item.name}
                                          </span>
                                        </Link>
                                        <Trash2
                                          className="cursor-pointer"
                                          onClick={() => {
                                            setalbumName(item.name);
                                            setDeleteOpen(true);
                                          }}
                                        />
                                      </div>
                                    </SidebarMenuButton>
                                  </SidebarMenuItem>
                                );
                              })}
                              <SidebarMenuItem>
                                <SidebarMenuButton
                                  asChild
                                  className="flex items-center justify-between text-gray-400 rounded-md px-3 py-2 hover:bg-muted hover:text-primary"
                                  onClick={() => {
                                    setDialogOpen(true);
                                    console.log("add album");
                                  }}
                                >
                                  <div className="w-full flex items-center justify-between">
                                    <span>Add an album</span>
                                    <Plus />
                                  </div>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            </CollapsibleContent>
                          </SidebarGroup>
                        </Collapsible>
                      </>
                    ) : (
                      <>
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={item.href}
                              className={clsx(
                                "flex items-center rounded-md px-3 py-2 hover:bg-muted hover:text-primary",
                                pathname === item.href
                                  ? "bg-muted text-primary font-bold"
                                  : "text-muted-foreground"
                              )}
                            >
                              <item.icon className="mr-2 h-4 w-4" />
                              <span>{item.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </>
                    )}
                  </div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <UserButton />
                    <span className="ml-2 flex-grow text-left">
                      {user?.fullName || user?.username}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <SignOutButton>
                      <span className="flex items-center">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </span>
                    </SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
