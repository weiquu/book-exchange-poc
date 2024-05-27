"use client";

import { Button, Select } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { trpc } from "../../hooks/trpc";
import type { Book } from "@prisma/client";
import "@mantine/core/styles.css";
import React from "react";

type Props = Readonly<{
  onSubmit: () => void;
  userId: string;
  selectedBook: Book;
}>;

export default function OfferExchangeForm({
  onSubmit,
  userId,
  selectedBook,
}: Props) {
  const utils = trpc.useUtils();
  const createExchangeMutation = trpc.exchanges.createExchange.useMutation({
    onSuccess: () => {
      utils.exchanges.getMyExchanges.invalidate();
      onSubmit();
    },
    onError: () => {
      // TODO: show error message
      console.error("Failed to offer exchange");
    },
  });
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { book: "" },
    validate: {
      book: isNotEmpty("Choose a book"),
    },
  });

  const myBooks =
    trpc.books.getMyListings.useQuery({ userId: userId }).data ?? [];

  function offerExchange(values: typeof form.values) {
    console.info(values.book);
    createExchangeMutation.mutateAsync({
      leftBookId: selectedBook.id,
      rightBookId: values.book,
    });
  }

  return (
    <form onSubmit={form.onSubmit(offerExchange)}>
      <Select
        label="Select Book to Exchange"
        placeholder="Choose a book"
        searchable
        nothingFoundMessage="No books found"
        required
        data={myBooks.map((book) => ({
          value: book.id,
          label: `${book.title} by ${book.author}`,
        }))}
        {...form.getInputProps("book")}
      />
      <Button type="submit" mt="md">
        Submit
      </Button>
    </form>
  );
}
