"use client";
import HardRefresh from "@/actions/HardRefresh";
import ImageSkel from "@/components/_components/ImagesSkeleton";
import MediaGallery, {
  CloudinaryResource,
} from "@/components/_components/Media/MediaGallery";
import {  Album, Media } from "@/gql/graphql";
import { getAllAlbums, useGetAlbumMedia } from "@/hooks/media";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AlbumPage({ albumName }: { albumName: string }) {
  const router = useRouter();
  const { media, isLoading } = useGetAlbumMedia(albumName);
  const { albums, isLoading: albumLoading } = getAllAlbums();
  const [mediaData, setMediaData] = useState<Media[]>([]);
  useEffect(() => {
    if (media) {
      setMediaData(media);
    }
  }, [media, isLoading]);

  useEffect(() => {
    console.log(albums);
    if (!albumLoading && albums) {
      const present = albums.find((album: Album) => album.name === albumName);
      if (!present) {
        router.push("/media");
      }
    }
  }, [albums]);

  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-screen">
        <ImageSkel />
      </div>
    );
  }
  // refetch()
  return (
    <>
      <div className="flex flex-col w-full ">
        <HardRefresh />
        <MediaGallery media={mediaData} type="album" album={albumName} />
      </div>
    </>
  );
}
