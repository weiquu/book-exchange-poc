"use client";

import ExchangeItem from "./ExchangeItem";
import { trpc } from "../../hooks/trpc";
import "@mantine/core/styles.css";
import { Button, Group, Modal, Text, Grid } from "@mantine/core";
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

  const [acceptOpened, { open: acceptOpen, close: acceptClose }] =
    useDisclosure(false);
  const [declineOpened, { open: declineOpen, close: declineClose }] =
    useDisclosure(false);
  const [selectedIncomingExchange, setSelectedIncomingExchange] =
    useState<ExchangeWithBookDetails | null>(null);

  const acceptExchangeMutation =
    trpc.exchanges.updateExchangeStatus.useMutation({
      onSuccess: () => {
        utils.exchanges.getMyExchanges.invalidate();
        acceptClose();
      },
      onError: () => {
        // TODO: show error message
        console.error("Failed to accept exchange");
      },
    });
  const acceptExchange = (exchangeId: string) => {
    acceptExchangeMutation.mutateAsync({ id: exchangeId, status: "ACCEPTED" });
  };
  const declineExchangeMutation =
    trpc.exchanges.updateExchangeStatus.useMutation({
      onSuccess: () => {
        utils.exchanges.getMyExchanges.invalidate();
        declineClose();
      },
      onError: () => {
        // TODO: show error message
        console.error("Failed to decline exchange");
      },
    });
  const declineExchange = (exchangeId: string) => {
    declineExchangeMutation.mutateAsync({ id: exchangeId, status: "REJECTED" });
  };

  return (
    <>
      <Grid>
        {exchanges?.map((exchange) => (
          <Grid.Col span={4}>
            <ExchangeItem
              key={exchange.id}
              exchange={exchange}
              userInitiatedExchange={userInitiatedExchange}
              onUpdateOrAcceptClick={
                userInitiatedExchange
                  ? (exchange: ExchangeWithBookDetails) => {
                      setSelectedOutgoingExchange(exchange);
                      updateOpen();
                    }
                  : (exchange: ExchangeWithBookDetails) => {
                      setSelectedIncomingExchange(exchange);
                      acceptOpen();
                    }
              }
              onDeleteOrDeclineClick={
                userInitiatedExchange
                  ? (exchange: ExchangeWithBookDetails) => {
                      setSelectedOutgoingExchange(exchange);
                      deleteOpen();
                    }
                  : (exchange: ExchangeWithBookDetails) => {
                      setSelectedIncomingExchange(exchange);
                      declineOpen();
                    }
              }
            ></ExchangeItem>
          </Grid.Col>
        ))}
      </Grid>

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

      {selectedIncomingExchange && (
        <Modal
          opened={acceptOpened}
          withCloseButton
          onClose={acceptClose}
          title="Accept Exchange Offer"
        >
          <Text>Are you sure you want to accept the exchange offer?</Text>
          <Group justify="space-between" mb="xs" mt="md">
            <Button onClick={acceptClose} color="gray">
              Cancel
            </Button>
            <Button
              onClick={() => acceptExchange(selectedIncomingExchange.id)}
              color="green"
            >
              Accept
            </Button>
          </Group>
        </Modal>
      )}

      {selectedIncomingExchange && (
        <Modal
          opened={declineOpened}
          withCloseButton
          onClose={declineClose}
          title="Decline Exchange Offer"
        >
          <Text>Are you sure you want to decline the exchange offer?</Text>
          <Group justify="space-between" mb="xs" mt="md">
            <Button onClick={declineClose} color="gray">
              Cancel
            </Button>
            <Button
              onClick={() => declineExchange(selectedIncomingExchange.id)}
              color="red"
            >
              Decline
            </Button>
          </Group>
        </Modal>
      )}
    </>
  );
}
