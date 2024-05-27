"use client";

import ExchangeItem from "./ExchangeItem";
import { trpc } from "../../hooks/trpc";
import "@mantine/core/styles.css";
import { Button, Container, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import React from "react";
import type { ExchangeWithBookDetails } from "./ExchangeListPage";
import UpdateExchangeForm from "./UpdateExchangeForm";

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
  const [updateOpened, { open: updateOpen, close: updateClose }] =
    useDisclosure(false);
  const [deleteOpened, { open: deleteOpen, close: deleteClose }] =
    useDisclosure(false);
  const [selectedOutgoingExchange, setSelectedOutgoingExchange] =
    useState<ExchangeWithBookDetails | null>(null);

  const deleteExchangeMutation = trpc.exchanges.deleteExchange.useMutation({
    onSuccess: () => {
      utils.exchanges.getMyExchanges.invalidate();
      deleteClose();
    },
    onError: () => {
      // TODO: show error message
      console.error("Failed to delete exchange");
    },
  });
  const deleteExchange = (exchangeId: string) => {
    deleteExchangeMutation.mutateAsync({ id: exchangeId });
  };

  //   const [exchangeOpened, { open: exchangeOpen, close: exchangeClose }] =
  //     useDisclosure(false);
  //   const [exchangeBook, setExchangeBook] = useState<Book | null>(null);

  return (
    <>
      <Container>
        {exchanges?.map((exchange) => (
          <ExchangeItem
            key={exchange.id}
            exchange={exchange}
            userInitiatedExchange={userInitiatedExchange}
            onUpdateOrAcceptClick={(exchange: ExchangeWithBookDetails) => {
              setSelectedOutgoingExchange(exchange);
              updateOpen();
            }}
            onDeleteOrDeclineClick={(exchange: ExchangeWithBookDetails) => {
              setSelectedOutgoingExchange(exchange);
              deleteOpen();
            }}
          ></ExchangeItem>
        ))}
      </Container>

      {selectedOutgoingExchange && (
        <Modal
          opened={updateOpened}
          withCloseButton
          onClose={updateClose}
          title="Update Exchange"
        >
          <UpdateExchangeForm
            exchange={selectedOutgoingExchange}
            onSubmit={updateClose}
          />
        </Modal>
      )}

      {selectedOutgoingExchange && (
        <Modal
          opened={deleteOpened}
          withCloseButton
          onClose={deleteClose}
          title="Delete Exchange"
        >
          <Text>Are you sure you want to delete your exchange offer?</Text>
          <Group justify="space-between" mb="xs" mt="md">
            <Button onClick={deleteClose} color="gray">
              Cancel
            </Button>
            <Button
              onClick={() => deleteExchange(selectedOutgoingExchange.id)}
              color="red"
            >
              Delete
            </Button>
          </Group>
        </Modal>
      )}
    </>
  );
}
