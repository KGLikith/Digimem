"use client";
import React from "react";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Upload } from "lucide-react";
import { apolloClient } from "@/clients/Apollo";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useGetAllMedia } from "@/hooks/media";
import { CloudinaryResource } from "../_components/Media/MediaGallery";

type Props = {
  userId: string;
};

export default function UploadButton({ userId }: Props) {
  // const router = useRouter();
  const { addResources } = useGetAllMedia();

  const queryClient = useQueryClient();
  return (
    <>
      <div>
        <CldUploadButton
          // onClose={async()=>{
          //   await apolloClient.resetStore();
          //   await queryClient.invalidateQueries({
          //     queryKey:["AllMedia"]
          //   })
          // }}
          onSuccess={async (result: CloudinaryUploadWidgetResults) => {
            try {
              console.log(result.info);
              await addResources([result.info as CloudinaryResource]);
              toast({
                variant: "success",
                description: "Image Uploaded Successfully",
                duration: 2000,
              });
              await new Promise((resolve) => setTimeout(resolve, 3000));
              await apolloClient.resetStore();
              await queryClient.invalidateQueries({
                queryKey: ["AllMedia"],
              });
              await queryClient.invalidateQueries({
                queryKey: ["MediaByTags", ["uploads"]],
              });
              // await apolloClient.resetStore();
              // await queryClient.invalidateQueries({
              //   queryKey: ["AllMedia"],
              // });
            } catch (err) {
              console.log(err);
            }
          }}
          options={{
            tags: ["uploads"],
            folder: `${userId}`,
            singleUploadAutoClose: true,
            showPoweredBy: false,
            autoMinimize: true,
            detection: "captioning",
            multiple: false,
            sources: [
              "local",
              "url",
              "unsplash",
              "google_drive",
              "instagram",
              "camera",
            ],
          }}
          signatureEndpoint={"/api/sign-cloudinary-params"}
          className="flex gap-4 justify-center items-center w-fit rounded-full bg-orange-500 px-5 py-3"
        >
          <Upload />
          Upload
        </CldUploadButton>
      </div>
    </>
  );
}
