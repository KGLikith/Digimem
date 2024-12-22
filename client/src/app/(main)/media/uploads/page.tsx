'use client'
import React from "react";
import MediaGallery from "@/components/_components/Media/MediaGallery";
// import { v2 as cloudinary } from "cloudinary";
import { useGetMediaByTags } from "@/hooks/media";

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

export default function Page() {
  // const { resources } = await cloudinary.api.resources_by_asset_folder({ tag: "creations" });
  const {media,refetch } = useGetMediaByTags(["uploads"]);
  // refetch()
  return (
    <>
      <div className="flex flex-col w-full ">
        <MediaGallery media={media} type="uploads" />
      </div>
    </>
  );
}
