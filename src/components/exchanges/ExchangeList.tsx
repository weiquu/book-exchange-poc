"use client";

import type { Exchange } from "@prisma/client";
import ExchangeItem from "./ExchangeItem";
import { trpc } from "../../hooks/trpc";

import "@mantine/core/styles.css";
import { Button, Container, Group, Modal, Text } from "@mantine/core";
// import UpdateBookForm from "./UpdateBookForm";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
// import OfferExchangeForm from "./OfferExchangeForm";
import React from "react";
import type { ExchangeWithBookDetails } from "./ExchangeListPage";

type Props = Readonly<{
  exchanges?: ExchangeWithBookDetails[];
  userInitiatedExchange: boolean;
  userId: string;
}>;

export default function BookList({
  exchanges,
  userInitiatedExchange,
  userId,
}: Props) {
  // TODO: search and filter options
  // TODO: pagination?
  const utils = trpc.useUtils();
  //   const [updateOpened, { open: updateOpen, close: updateClose }] =
  //     useDisclosure(false);
  //   const [deleteOpened, { open: deleteOpen, close: deleteClose }] =
  //     useDisclosure(false);
  //   const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  //   const deleteBookMutation = trpc.books.deleteListing.useMutation({
  //     onSuccess: () => {
  //       utils.books.getAllListings.invalidate();
  //       utils.books.getMyListings.invalidate();
  //       deleteClose();
  //     },
  //     onError: () => {
  //       // TODO: show error message
  //       console.error("Failed to delete book");
  //     },
  //   });

  //   const [exchangeOpened, { open: exchangeOpen, close: exchangeClose }] =
  //     useDisclosure(false);
  //   const [exchangeBook, setExchangeBook] = useState<Book | null>(null);

  //   const deleteBook = (bookId: string) => {
  //     deleteBookMutation.mutateAsync({ id: bookId });
  //   };

  return (
    <>
      <Container>
        {exchanges?.map((exchange) => (
          <ExchangeItem
            key={exchange.id}
            exchange={exchange}
            userInitiatedExchange={userInitiatedExchange}
          ></ExchangeItem>
        ))}
      </Container>
    </>
  );
}
