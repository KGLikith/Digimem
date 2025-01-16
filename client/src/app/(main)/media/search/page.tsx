"use client";
import React, { Suspense, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Media from "./Media";
import { useSearchParams } from "next/navigation";

function Search() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  return (
    <div className="relative w-full">
      <SearchBar searchParams={search} />
      {search && <Media search={search} />}
    </div>
  );
}

export default function page() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}
