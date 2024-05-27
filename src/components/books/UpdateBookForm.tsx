"use client";

import { Button, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { trpc } from "../../hooks/trpc";
import "@mantine/core/styles.css";
import type { Book } from "@prisma/client";
import React from "react";

type Props = Readonly<{
  book: Book;
  onSubmit: () => void;
}>;

// TODO: refactor this with AddBookForm
export default function UpdateBookForm({ book, onSubmit }: Props) {
  const utils = trpc.useUtils();
  const updateBookMutation = trpc.books.updateListing.useMutation({
    onSuccess: () => {
      utils.books.getAllListings.invalidate();
      utils.books.getMyListings.invalidate();
      onSubmit();
    },
    onError: () => {
      // TODO: show error message
      console.error("Failed to update book");
    },
  });
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { title: book.title, author: book.author },
    validate: {
      title: isNotEmpty("Enter a title"),
      author: isNotEmpty("Enter an author"),
    },
  });

  function updateBook(values: typeof form.values) {
    updateBookMutation.mutateAsync({
      title: values.title,
      author: values.author,
      id: book.id,
    });
  }

  return (
    <form onSubmit={form.onSubmit(updateBook)}>
      <TextInput
        {...form.getInputProps("title")}
        label="Title"
        placeholder="Title"
      />
      <TextInput
        {...form.getInputProps("author")}
        label="Author"
        placeholder="Author"
      />
      <Button type="submit" mt="md">
        Submit
      </Button>
    </form>
  );
}
