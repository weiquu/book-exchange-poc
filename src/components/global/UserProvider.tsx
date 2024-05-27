"use client";

import { createContext } from "react";
import type { ReactNode } from "react";
import React from "react";
import { trpc } from "../../hooks/trpc";
import type { User } from "@prisma/client";

export const UserContext = createContext<User | null>(null);

type Props = Readonly<{
  children: ReactNode;
}>;
export default function UserProvider({ children }: Props) {
  if (typeof window === "undefined") {
    return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
  }

  const userId = localStorage.getItem("userId");
  if (!userId) {
    return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
  }

  const { data: user } = trpc.users.getUserById.useQuery({
    id: userId,
  });

  return (
    <UserContext.Provider value={user ?? null}>{children}</UserContext.Provider>
  );
}
