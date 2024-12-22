"use client";
import React, { Suspense, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useGetMediaByTags } from "@/hooks/media";
import Media from "./Media";
import { useSearchParams } from "next/navigation";

type Props = {};

export default function page() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  return (
    <div className="relative w-full">
      <SearchBar searchParams={search} />
      {search && <Media search={search} />}
    </div>
  );
}
