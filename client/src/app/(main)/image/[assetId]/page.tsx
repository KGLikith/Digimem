import React from "react";
import { v2 as cloudinary } from "cloudinary";
import MediaViewer from "@/components/_components/Media/MediaViewer";
import Loader from "@/components/ui/loader";
import { CloudinaryResource } from "@/components/_components/Media/MediaGallery";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function ({
  params,
}: {
  params: Promise<{ assetId: string }>;
}) {
  const { assetId } = await params;
  console.log("asetid", assetId);

  const { resources } = await cloudinary.api.resources_by_asset_ids([assetId],{
    tags: true
  });

  if (!resources[0])
    return (
      <div className="flex justify-center items-center h-screen w-full bg-black">
        <Loader state color="white" />
      </div>
    );

  return (
    <div>
      <MediaViewer resource={resources[0] as CloudinaryResource} />
    </div>
  );
}
