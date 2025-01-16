"use client";
import React, { useEffect, useState } from "react";
import MediaGallery from "@/components/_components/Media/MediaGallery";
import { useGetAllMedia } from "@/hooks/media";
import ImageSkel from "@/components/_components/ImagesSkeleton";
import { ImageStore } from "@/lib/image-store";
import { LayerStore } from "@/lib/layer-store";

export default function Page() {
  const { media, isLoading } = useGetAllMedia();
  // console.log(media);
  const [mediaData, setMediaData] = useState(media);

  useEffect(() => {
    // console.log("media", media);
    if (media) {
      setMediaData(media);
    }
  }, [media, isLoading]);
  // console.log("mediaData", mediaData);

  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-screen">
        <ImageSkel />
      </div>
    );
  }

  return (
    <>
      <ImageStore.Provider
        initialValue={{
          activeTag: "all",
          activeColor: "green",
          activeImage: "",
        }}
      >
        <LayerStore.Provider
          initialValue={{
            layerComparisonMode: false,
            layers: [
              {
                id: crypto.randomUUID(),
                url: "",
                height: 0,
                width: 0,
                publicId: "",
              },
            ],
          }}
        >
          <div className="flex flex-col w-full ">
            <MediaGallery media={mediaData} type="media" />
          </div>
        </LayerStore.Provider>
      </ImageStore.Provider>
    </>
  );
}
