"use client";
import ImageSkel from "@/components/_components/ImagesSkeleton";
import MediaGallery from "@/components/_components/Media/MediaGallery";
import Skel from "@/components/_components/Skeleton";
import { Media } from "@/gql/graphql";
import { useGetMediaByTags } from "@/hooks/media";
import React, { useEffect, useState } from "react";

type Props = {
  search: string;
};

export default function MediaPage({ search }: Props) {
  const [searchParams, setsearchParams] = useState<string>(search);
  const [mediaData, setMediaData] = useState<Media[]>([]);
  useEffect(() => {
    if (searchParams) {
      setsearchParams(search);
    }
  }, [search]);
  console.log(searchParams);

  const { media, isLoading } = useGetMediaByTags([searchParams]);

  useEffect(() => {
    setMediaData(media);
  }, [media, isLoading]);

  console.log("media", media);
  console.log("mediaData", mediaData);
  if (isLoading) {
    return (
      <>
        <ImageSkel type="search" />
      </>
    );
  }

  if (!mediaData || mediaData.length === 0)
    return (
      <>
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-2xl">No media found</p>
        </div>
      </>
    );
  return (
    <>
      <MediaGallery media={media} type="search" />
    </>
  );
}
