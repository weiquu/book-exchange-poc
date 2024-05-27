"use client";

import type { Book } from "@prisma/client";
import BookItem from "./BookItem";

import "@mantine/core/styles.css";
import { Container } from "@mantine/core";

type Props = Readonly<{
  books?: Book[];
}>;

export default function BookList({ books }: Props) {
  // TODO: search and filter options
  // TODO: pagination?
  return (
    <Container>
      {books?.map((book) => (
        <BookItem key={book.id} book={book}></BookItem>
      ))}
    </Container>
  );
}
