import React from "react";
import { ArrowRight } from "lucide-react";
import { PageHeaderHeading } from "../ui/PageHeader";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-gradient-to-br from-transparent via-gray-100 to-transparent text-zinc-800 dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-white py-16 lg:py-24 w-full min-h-[90vh] flex items-center"
    >
      <div className="container mx-auto px-4 sm:px-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <PageHeaderHeading className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Preserve Your Memories,
              {/* <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Preserve Your Memories,
              </span> */}
              <br />
              <span className=" dark:text-gray-200 text-gray-800">
                Share Your Story
              </span>
            </PageHeaderHeading>
            {/* <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
              <PageHeaderHeading className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Preserve Your Memories,
              </PageHeaderHeading> */}
            {/* <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Preserve Your Memories,
              </span> */}
            {/* <br />
              <span className=" dark:text-gray-200">Share Your Story</span>
            </h1> */}
            <p className="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
              Effortlessly store, organize, and relive your cherished moments in
              one place.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-lg hover:opacity-90 transition-all duration-300 flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-6 py-3 text-blue-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300  ">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            <div className="relative space-y-4">
              <div className="flex items-center justify-end space-x-4">
                {/* <div className="w-32 h-32 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    width={128}
                    height={128}
                    alt="Memory 1"
                    className="object-cover"
                  />
                </div>
                <div className="w-40 h-40 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=160&width=160"
                    width={160}
                    height={160}
                    alt="Memory 2"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-40 h-40 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=160&width=160"
                    width={160}
                    height={160}
                    alt="Memory 3"
                    className="object-cover"
                  />
                </div>
                <div className="w-32 h-32 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    width={128}
                    height={128}
                    alt="Memory 4"
                    className="object-cover"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
