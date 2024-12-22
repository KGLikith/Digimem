import React, { forwardRef } from "react";
import { CldImage as CldImageDefault, CldImageProps } from "next-cloudinary";
import { ImageProps } from "next/image";

interface Props extends CldImageProps {
  // imageref?: React.RefObject<HTMLImageElement>;
}

const CldImage = forwardRef<HTMLImageElement, Props>((props: Props, ref) => {
  const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  const dataUrl = `data:image/svg+xml;base64,${toBase64(shimmer(600, 400))}`;

  return (
    <>
      <CldImageDefault
        {...props}
        ref={ref}
        gravity="auto"
        crop={"fill"}
        placeholder={dataUrl as ImageProps["placeholder"]}
      />
    </>
  );
});

CldImage.displayName = "CldImage";
export default CldImage;
