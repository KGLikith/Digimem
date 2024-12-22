"use client";
import Loader from "@/components/ui/loader";
import { SignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// type Props = {};

export default function SignUpPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      if (isSignedIn && user) {
        setLoading(true);
        const {
          id: userId,
          emailAddresses,
          firstName,
          lastName,
          imageUrl,
        } = user;

        try {
          // Send the user data to the backend
          const response = await fetch("/api/verify-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              email: emailAddresses[0]?.emailAddress,
              firstName,
              lastName,
              profileImageUrl: imageUrl,
            }),
          });
          const data = await response.json();
          if (!response.ok) {
            console.error("Failed to verify user data");
            return;
          } else {
            localStorage.setItem("__digimem_token", data.token);
          }
          setLoading(false);
          router.push("/media");
        } catch (error) {
          console.error("Error saving user data:", error);
        }
      }
    };

    verifyUser();
  }, [isSignedIn, user, router]);

  if (loading || isSignedIn)
    return (
      <>
        <div className="flex justify-center items-center h-full w-full">
          <Loader state></Loader>
        </div>
      </>
    );
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp />
    </div>
  );
}
