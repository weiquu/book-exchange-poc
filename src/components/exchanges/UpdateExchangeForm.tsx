"use client";

import { Button, Select } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { trpc } from "../../hooks/trpc";
import "@mantine/core/styles.css";
import type { ExchangeWithBookDetails } from "./ExchangeListPage";
import React from "react";

type Props = Readonly<{
  exchange: ExchangeWithBookDetails;
  onSubmit: () => void;
}>;

// TODO: refactor this with the other forms
export default function UpdateExchangeForm({ exchange, onSubmit }: Props) {
  const myBooks = trpc.books.getMyListings.useQuery({
    userId: exchange.requesterBook.listedById,
  }).data ?? [exchange.requesterBook];

  const utils = trpc.useUtils();
  const updateExchangeMutation = trpc.exchanges.updateExchangeBook.useMutation({
    onSuccess: () => {
      utils.exchanges.getMyExchanges.invalidate();
      onSubmit();
    },
    onError: () => {
      // TODO: show error message
      console.error("Failed to update exchange");
    },
  });
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      book: exchange.requesterBookId,
    },
    validate: {
      book: isNotEmpty("Choose a book"),
    },
  });

  function updateExchange(values: typeof form.values) {
    updateExchangeMutation.mutateAsync({
      id: exchange.id,
      requesterBookId: values.book,
    });
  }

  return (
    <form onSubmit={form.onSubmit(updateExchange)}>
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
