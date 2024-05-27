"use client";

import { trpc } from "../../hooks/trpc";
import "@mantine/core/styles.css";
import {
  Anchor,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import type { ExchangeWithBookDetails } from "./ExchangeListPage";

type Props = Readonly<{
  exchange: ExchangeWithBookDetails;
  userInitiatedExchange: boolean;
  onUpdateOrAcceptClick: (exchange: ExchangeWithBookDetails) => void;
  onDeleteOrDeclineClick: (exchange: ExchangeWithBookDetails) => void;
}>;

export default function ExchangeItem({
  exchange,
  userInitiatedExchange,
  onUpdateOrAcceptClick,
  onDeleteOrDeclineClick,
}: Props) {
  const myBook = userInitiatedExchange
    ? exchange.requesterBook
    : exchange.requestedBook;
  const otherBook = userInitiatedExchange
    ? exchange.requestedBook
    : exchange.requesterBook;
  const { data: otherUser } = trpc.users.getUserById.useQuery({
    id: otherBook.listedById,
  });

  // TODO: link to other's profile
  return (
    <Card mb="md" padding="lg" radius="md" shadow="sm" withBorder={true}>
      <Title order={3}>
        {userInitiatedExchange
          ? exchange.status === "PENDING"
            ? "You offered an exchange to "
            : `You ${exchange.status.toLowerCase()} an exchange with `
          : "You received an exchange offer from "}
        <Anchor href="/">{otherUser?.name}</Anchor>
      </Title>
      <Divider my="md" />
      <Stack gap="xs">
        <Title order={4}>Exchange Details</Title>
        <Text size="md">
          You will give {myBook.title} by {myBook.author}
        </Text>
        <Text size="md">
          You will receive {otherBook.title} by {otherBook.author}
        </Text>
      </Stack>
      {exchange.status === "PENDING" && (
        <>
          <Divider my="md" />
          <Group justify="space-between" mb="xs" mt="md">
            {userInitiatedExchange ? (
              <>
                <Button onClick={() => onUpdateOrAcceptClick(exchange)}>
                  Update Exchange
                </Button>
                <Button
                  color="red"
                  onClick={() => onDeleteOrDeclineClick(exchange)}
                >
                  Delete Exchange
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="green"
                  onClick={() => onUpdateOrAcceptClick(exchange)}
                >
                  Accept Exchange
                </Button>
                <Button
                  color="red"
                  onClick={() => onDeleteOrDeclineClick(exchange)}
                >
                  Decline Exchange
                </Button>
              </>
            )}
          </Group>
        </>
      )}
    </Card>
  );
}
