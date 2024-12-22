import React from "react";
import { Skeleton } from "../ui/skeleton";

const ImageSkel = ({type}:{type?:string}) => {
  return (
    <div className="m-4">
      <div className="flex flex-col space-y-3 ">
        {!type && 
        <Skeleton className="h-[75px] w-full rounded-xl" />}
        <div className="space-y-2 flex flex-col flex-wrap">
          <div className="flex gap-4 items-center justify-center">
            <Skeleton className="h-[200px] w-1/4" />
            <Skeleton className="h-[200px] w-1/4" />
            <Skeleton className="h-[200px] w-1/4" />
            <Skeleton className="h-[200px] w-1/4" />
          </div>
          <div className="flex gap-4 items-center justify-center">
            <Skeleton className="h-[200px] w-1/4" />
            <Skeleton className="h-[200px] w-1/4" />
            <Skeleton className="h-[200px] w-1/4" />
            <Skeleton className="h-[200px] w-1/4" />
          </div>
          <div className="flex gap-4 items-center justify-center">
            <Skeleton className="h-[200px] w-1/4" />
            <Skeleton className="h-[200px] w-1/4" />
            <Skeleton className="h-[200px] w-1/4" />
            <Skeleton className="h-[200px] w-1/4" />
          </div>
          <div className="flex gap-4 items-center justify-center">
            <Skeleton className="h-[200px] w-1/4" />
            <Skeleton className="h-[200px] w-1/4" />
            <Skeleton className="h-[200px] w-1/4" />
            <Skeleton className="h-[200px] w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSkel;
