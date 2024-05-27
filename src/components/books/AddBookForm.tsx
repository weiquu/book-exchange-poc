"use client";

import { Button, TextInput, PasswordInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { trpc } from "../../hooks/trpc";
import "@mantine/core/styles.css";
import React from "react";

type Props = Readonly<{
  onSubmit: () => void;
  userId: string;
}>;

export default function AddBookForm({ onSubmit, userId }: Props) {
  const utils = trpc.useUtils();
  const addBookMutation = trpc.books.createListing.useMutation({
    onSuccess: () => {
      utils.books.getAllListings.invalidate();
      utils.books.getMyListings.invalidate();
      onSubmit();
    },
    onError: () => {
      // TODO: show error message
      console.error("Failed to add book");
    },
  });
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { title: "", author: "", summary: "" },
    validate: {
      title: isNotEmpty("Enter a title"),
      author: isNotEmpty("Enter an author"),
      summary: isNotEmpty("Enter a summary"),
    },
  });

  function addBook(values: typeof form.values) {
    addBookMutation.mutateAsync({
      title: values.title,
      author: values.author,
      summary: values.summary,
      userId: userId,
    });
  }

  return (
    <form onSubmit={form.onSubmit(addBook)}>
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
      <TextInput
        {...form.getInputProps("summary")}
        label="Summary"
        placeholder="Enter a summary of the book"
      />
      <Button type="submit" mt="md">
        Submit
      </Button>
    </form>
  );
}
