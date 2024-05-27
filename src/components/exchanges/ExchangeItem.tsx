"use client";

import { trpc } from "../../hooks/trpc";
import "@mantine/core/styles.css";
import {
  Anchor,
  Button,
  Card,
  Divider,
  Group,
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
          ? "You offered an exchange to "
          : "You received an exchange offer from "}
        <Anchor href="/">{otherUser?.name}</Anchor>
      </Title>
      <Text size="md">
        You will give {myBook.title} by {myBook.author}
      </Text>
      <Text size="md">
        You will receive {otherBook.title} by {otherBook.author}
      </Text>
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
            <Button color="green" onClick={() => console.info("click!")}>
              Accept Exchange
            </Button>
            <Button color="red" onClick={() => console.info("click!")}>
              Decline Exchange
            </Button>
          </>
        )}
      </Group>
    </Card>
  );
}
