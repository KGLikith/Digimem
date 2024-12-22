import React, { useCallback, useRef, useState, useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FullHeart } from "@/components/icons/full-heart";
import { Heart } from "@/components/icons/heart";
import Link from "next/link";
import { Album, ArrowDownToLine, X } from "lucide-react";
import CldImage from "@/components/cloudinary/CldImage";
import { CloudinaryResource } from "./MediaGallery";
import { setAsFavoriteAction } from "@/actions/setAsFavoriteAction";
import { useRouter } from "next/navigation";
import { useGetMediaByTags } from "@/hooks/media";
import { FaArrowRight, FaHeart, FaRegComment, FaUser } from "react-icons/fa6";
import { AiOutlineRetweet } from "react-icons/ai";
import { CiBookmark, CiHeart, CiMenuKebab } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CldVideoPlayer } from "next-cloudinary";

type Props = {
  resource: CloudinaryResource;
  isChecked: boolean;
  type: string;
  handleOnSelectResource: (checked: boolean) => void;
};

export default function MediaBlock({
  resource,
  isChecked,
  handleOnSelectResource,
}: Props) {
  const router = useRouter();
  const imageref = useRef<HTMLImageElement>(null);
  console.log("imagRef", imageref);

  const handleDownload = () => {
    if (!imageref.current?.src) return;
    fetch(imageref.current?.src as string)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${resource.display_name}.png`;
        document.body.appendChild(link);
        link.click();
        // document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      });
  };

  const { markAsFavorite } = useGetMediaByTags(["favourites"]);
  const [isFavorited, setIsFavorited] = useState<boolean>(
    resource.tags?.includes("favourites") || false
  );
  const handleIsFavourited = useCallback(async () => {
    setAsFavoriteAction(resource.public_id, true, setIsFavorited, isFavorited);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsFavorited(true);
    markAsFavorite(resource.public_id, true);
  }, [resource]);

  const handleIsRemoveFavourited = useCallback(async () => {
    setAsFavoriteAction(resource.public_id, false, setIsFavorited, isFavorited);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsFavorited(false);
    markAsFavorite(resource.public_id, false);
  }, [resource]);

  return (
    <>
      <li
        key={resource.public_id}
        className={`bg-white min-h-32 group dark:bg-transparent rounded-md border-4 shadow-sm overflow-hidden flex justify-center items-center relative
        ${isChecked ? "border-blue-500" : "border-transparent"}`}
      >
        <div className="absolute top-1 left-1 bg-transparent flex px-1 justify-between items-start w-full">
          <div className=" flex justify-center items-center">
            <label
              className={`block transition-opacity p-1 rounded-full bg-white dark:bg-zinc-700 shadow-md ${
                isChecked ? "opacity-100" : "opacity-0"
              } group-hover:opacity-100`}
              htmlFor={resource.public_id}
            >
              <span className="sr-only">
                Select Image &quot;{resource.public_id}&quot;
              </span>
              <Checkbox
                className={`w-4 h-4 appearance-none rounded-full shadow-md border-2 ${
                  isChecked
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-300 dark:border-zinc-700"
                } flex items-center justify-center`}
                id={resource.public_id}
                onCheckedChange={handleOnSelectResource}
                checked={isChecked}
              >
                {isChecked && <X className="w-2 h-2" />}
              </Checkbox>
            </label>
            <div
              className={`block transition-opacity p-1 rounded-full bg-transparentshadow-md opacity-0 group-hover:opacity-100`}
            >
              {isFavorited ? (
                <FullHeart
                  onClick={handleIsRemoveFavourited}
                  className="  text-red-500 cursor-pointer"
                />
              ) : (
                <Heart
                  onClick={handleIsFavourited}
                  className=" hover:text-red-700 text-red-400 cursor-pointer"
                />
              )}
            </div>
          </div>
          <div
            className={`block transition-opacity p-1 rounded-full bg-transparentshadow-md opacity-0 group-hover:opacity-100`}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="rounded-full hover:bg hover:text-[#1d9bf0]">
                  <CiMenuKebab width={40} height={40} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-18 bg-black "
                style={{
                  boxShadow:
                    "rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px",
                }}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <div
                      onClick={handleDownload}
                      className="w-full flex justify-between items-center"
                    >
                      <ArrowDownToLine width={40} height={40} />
                      Download
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Link
          className={`block cursor-pointer transition-[border] `}
          href={`/image/${resource.asset_id}`}
        >
          {resource.url && resource.resource_type == "image" && (
            <div>
              <CldImage
                ref={imageref}
                width={300}
                height={400}
                src={resource.url}
                alt="Cloudinary Image"
                sizes="(min-width: 640px) 50%, (min-width: 768px) 33%, (min-width: 1024px) 25%, 100%"
              />
            </div>
          )}
          {/* {resource.url && resource.resource_type == "video" && (
            <CldVideoPlayer
              width={resource.width}
              height={resource.height}
              src={resource.public_id}
              //   sizes="(min-width: 640px) 50%, (min-width: 768px) 33%, (min-width: 1024px) 25%, 100%"
            />
          )} */}
        </Link>
      </li>
    </>
  );
}
