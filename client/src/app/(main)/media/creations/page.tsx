'use client'
import React, { useEffect, useState } from "react";
import MediaGallery from "@/components/_components/Media/MediaGallery";
import { useGetMediaByTags } from "@/hooks/media";
import { useCurrentUser } from "@/hooks/user";
import ImageSkel from "@/components/_components/ImagesSkeleton";
import HardRefresh from "@/actions/HardRefresh";

export default function Page() {
  const {media,isLoading } = useGetMediaByTags(["creations"]);

  const [mediaData, setMediaData] = useState(media);

  useEffect(() => {
    if (media) {
      setMediaData(media);
    }
  }, [media, isLoading]);

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
        <MediaGallery media={mediaData} type="creations" />
      </div>
    </>
  );
}
