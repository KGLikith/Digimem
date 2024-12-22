import React from "react";
import Album from "./Album";

export default async function Page({
  params,
}: {
  params: Promise<{ albumName: string }>;
}) {
  const { albumName } = await params;
  // refetch()
  return (
    <>
      <Album albumName={albumName} />
    </>
  );
}
