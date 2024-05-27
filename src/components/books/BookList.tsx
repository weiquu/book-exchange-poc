"use client";

import { type ChangeEvent, useEffect, useState } from "react";

import { trpc } from "../../hooks/trpc";

import type { Book } from "@prisma/client";

import BookItem from "./BookItem";

import "@mantine/core/styles.css";

import { Box, Text, Title } from "@mantine/core";

export default function BookList() {
  // const [books, setBooks] = useState<Array<Book>>([]);
  const { isLoading, data: books } = trpc.books.getAllListings.useQuery();

  function sortByCreatedDate(a: Book, b: Book) {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  }

  return (
    <Box m="lg">
      <Title mb="md" order={2}>
        Available Books for Exchange
      </Title>
      <Text hidden={!isLoading} size="md">
        Loading...
      </Text>
      {books?.map((book) => (
        <BookItem key={book.id} book={book}></BookItem>
      ))}
    </Box>
  );
}
