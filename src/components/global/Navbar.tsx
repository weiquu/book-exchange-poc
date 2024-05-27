"use client";

import { Anchor, AppShell, Button, Container, Group } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import { usePathname, redirect, useRouter } from "next/navigation";

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
  const router = useRouter();
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
        <Group mx="md" mt={15} justify="space-between" align="center">
          <Group gap="lg">
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
          <Button
            onClick={() => {
              localStorage.removeItem("userId");
              router.push("/");
            }}
          >
            Logout
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Container size="lg">{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
}
