"use client";
import { apolloClient } from "@/clients/Apollo";
import Loader from "@/components/ui/loader";
import { verifyUserQuery } from "@/graphql/queries/user";
import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// type Props = {};

export default function Signin() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const verifyUser = async () => {
      if (isSignedIn && user) {
        setLoading(true);
        const {
          // id: userId,
          emailAddresses,
          firstName,
          lastName,
          imageUrl,
        } = user;

        try {
          const { data } = await apolloClient.query({
            query: verifyUserQuery,
            variables: {
              email: emailAddresses[0]?.emailAddress,
              firstName,
              lastName,
              profileImageUrl: imageUrl,
            },
          });
          const { verifyUser } = data;

          if (verifyUser) {
            localStorage.setItem("__digimem_token", verifyUser);
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
      <div className="h-screen w-full flex justify-center items-center ">
        <Loader state></Loader>
      </div>
    );
  return (
    <div className="flex justify-center items-center h-screen">
      {/* <CheckForUser user={user}/> */}
      <SignIn />
    </div>
  );
}
