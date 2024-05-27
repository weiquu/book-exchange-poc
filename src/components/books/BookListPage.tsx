"use client";

import { type ChangeEvent, useEffect, useState, useContext } from "react";
import { redirect } from "next/navigation";
import { UserContext } from "../global/UserProvider";
import { trpc } from "../../hooks/trpc";
import type { Book } from "@prisma/client";
import BookList from "./BookList";
import "@mantine/core/styles.css";
import React from "react";
import { Box, Text, Title } from "@mantine/core";

export default function BookListPage() {
  if (typeof window !== "undefined" && !localStorage.getItem("userId")) {
    redirect("/login");
  }

  const user = useContext(UserContext);
  console.info(user);
  // TODO: search and filter options
  // TODO: pagination?
  // TODO: button to bring up add book dialog
  // TODO: tabs for all listings and my listings
  return <BookList />;
}
