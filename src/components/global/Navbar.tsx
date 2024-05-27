"use client";

import { Anchor, AppShell, Container, Group } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import { usePathname, redirect } from "next/navigation";

type NavbarTabCategory = "books" | "exchanges" | "profile";
type NavbarTab = Readonly<{
  category: NavbarTabCategory;
  label: string;
  href: string;
  isActive: boolean;
}>;

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function Navbar({ children }: Props) {
  if (typeof window !== "undefined" && !localStorage.getItem("userId")) {
    redirect("/login");
  }
  const pathname = usePathname();
  const navbarTabs: NavbarTab[] = [
    {
      category: "books",
      label: "Books",
      href: "/books",
      isActive: pathname === "/books",
    },
    {
      category: "exchanges",
      label: "Exchanges",
      href: "/exchanges",
      isActive: pathname === "/exchanges",
    },
    {
      category: "profile",
      label: "My Profile",
      href: `/profile/${localStorage.getItem("userId")}`,
      isActive: pathname === `/profile/${localStorage.getItem("userId")}`,
    },
  ];

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group ml="md" mt={15} gap="lg">
          {navbarTabs.map((tab) => (
            <Anchor
              key={tab.category}
              size="xl"
              ml="md"
              href={tab.href}
              fw={tab.isActive ? 900 : undefined}
              td={tab.isActive ? "underline" : undefined}
            >
              {tab.label}
            </Anchor>
          ))}
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Container size="lg">{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
}
