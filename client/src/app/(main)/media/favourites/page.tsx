"use client";
import React, { useEffect, useState } from "react";
import MediaGallery from "@/components/_components/Media/MediaGallery";
// import { v2 as cloudinary } from "cloudinary";
import { useGetMediaByTags } from "@/hooks/media";
import { Media } from "@/gql/graphql";
import ImageSkel from "@/components/_components/ImagesSkeleton";
import HardRefresh from "@/actions/HardRefresh";

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

export default function Page() {
  // const { resources } = await cloudinary.api.resources_by_asset_folder({ tag: "creations" });
  const { media, isLoading } = useGetMediaByTags(["favourites"]);
  console.log(media);
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
  return (
    <>
      <div className="flex flex-col w-full ">
        <HardRefresh />
        <MediaGallery media={mediaData} type="favourites" />
      </div>
    </>
  );
}
