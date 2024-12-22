"use client";
import { UserResource } from "@clerk/types"; 
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useUser } from "@clerk/nextjs";
export type UserContextType = UserResource | null;

const Context = createContext<{ currentUser: UserContextType } | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user, isSignedIn } = useUser();
  const [currentUser, setCurrentUser] = useState<UserContextType>(null);

  useEffect(() => {
    if (isSignedIn) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  }, [user, isSignedIn]);

  return (
    <Context.Provider value={{currentUser}} >{children}</Context.Provider>
  )
};

export const useUserContext = () => {
  return useContext(Context);
};
