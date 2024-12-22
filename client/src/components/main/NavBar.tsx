"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ToggleTheme } from "../_components/ToggleTheme";
import Link from "next/link";
import NavButton from "../_components/NavButton";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { useUserContext } from "@/context";

export default function NavBar() {
  const user = useUserContext();
  const [activeSection, setActiveSection] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          currentSection = section.getAttribute("id") || "";
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && pathname === "/") {
      const hash = window.location.hash.replace("#", ""); // Get the hash without the `#`
      if (hash) {
        const section = document.getElementById(hash);
        if (section) {
          const topOffset =
            section.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: topOffset, behavior: "smooth" });
        }
        router.replace(pathname, undefined);
      }
    }
  }, [pathname, router]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) {
      router.push(`/#${id}`);
    }
    if (section) {
      const topOffset =
        section.getBoundingClientRect().top + window.scrollY - 30;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        className={cn(
          "sticky py-4 px-6 top-3 mx-10 w-[90vw] bg-[#F9F9F9] dark:bg-black dark:bg-background/80 dark:backdrop-blur dark:supports-[backdrop-filter]:bg-background/70 rounded-full z-50 text-black dark:text-white border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border"
        )}
      >
        <div className="flex justify-between lg:px-0 lg:justify-around items-center  ">
          <div className="flex justify-center items-center md:gap-2 lg:gap-8">
            {/* <Image
              src={"https://bock.co.in/images/Bockmain.svg"}
              width={80}
              height={40}
              alt="BockLogo"
              className="object-cover object-center dark:filter dark:invert"
            /> */}
            DigiMemory
            {/* <MemoryVaultLogo className="w-[40px] h-[40px] "  /> */}
            <ul className="hidden lg:flex justify-center items-center font-medium text-[#09090bcc] dark:text-[#fafafacc]">
              <li
                className={cn(
                  "px-3 py-2 rounded-full dark:hover:bg-zinc-900 hover:bg-gray-200 cursor-pointer",
                  activeSection === "hero"
                    ? "bg-gray-200 dark:bg-accent text-accent-foreground"
                    : ""
                )}
                onClick={() => scrollToSection("hero")}
              >
                Home
              </li>
              <li
                className={cn(
                  "px-3 py-2 rounded-full dark:hover:bg-zinc-900 hover:bg-zinc-100 cursor-pointer",
                  activeSection === "features"
                    ? "bg-accent text-accent-foreground"
                    : ""
                )}
                onClick={() => scrollToSection("features")}
              >
                Features
              </li>
            </ul>
          </div>
          <div className="flex gap-6 items-center justify-center">
            <div className="flex justify-center items-center gap-3">
              {!user?.currentUser ? (
                <>
                  <NavButton
                    variant={"outline"}
                    text={"Login"}
                    href={"/sign-in"}
                  />
                  <NavButton
                    text={"Get Started"}
                    variant="default"
                    href={"/sign-up"}
                  />
                </>
              ) : (
                <>
                  <div className="flex justify-center items-center gap-3">
                    <Link href={"/media"}>
                      <NavButton
                        text={"Dashboard"}
                        variant="default"
                        href="/"
                      />
                    </Link>
                    <div className=" px-4 py-2 rounded-full border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground ">
                      <SignOutButton redirectUrl="/" />
                    </div>
                  </div>
                </>
              )}
              <ToggleTheme />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
