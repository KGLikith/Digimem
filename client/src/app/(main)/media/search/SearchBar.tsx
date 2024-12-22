"use client";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function SearchBar({ searchParams }: { searchParams: string }) {
  const [tagName, setTagName] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (searchParams) {
      setTagName(searchParams as string);
    }
  }, []);

  useEffect(() => {
    setTagName(tag)
  }, [tag]);

  return (
    <div className="sticky flex items-center justify-start gap-4 min-h-20 mb-4 py-4 px-6 top-0 w-full bg-[#F9F9F9] dark:bg-gray-900 dark:bg-background/80 dark:backdrop-blur dark:supports-[backdrop-filter]:bg-background/70  z-20 text-black dark:text-white border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="flex items-center justify-between gap-5 w-1/2">
        <SearchIcon className="h-4 w-4" />
        <Input
          type="search"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          placeholder="Search"
          className="w-full border-2 h-8 font-semibold  text-black dark:text-white bg-transparent dark:bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
      </div>
      <div>
        <button
          onClick={() => {
            setTag(tagName);
            router.replace(
              `/media/search?search=${encodeURIComponent(tagName)}`
            );
            router.refresh();
          }}
          className="text-sm font-semibold text-white bg-blue-500 dark:bg-blue-500 px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
