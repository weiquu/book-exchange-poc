"use client";

import { useContext } from "react";
import { redirect } from "next/navigation";
import { UserContext } from "../global/UserProvider";
import { useState } from "react";
import { trpc } from "../../hooks/trpc";
import "@mantine/core/styles.css";
import type { Exchange, Book } from "@prisma/client";
import React from "react";
import {
  Button,
  Grid,
  Modal,
  Stack,
  Switch,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import ExchangeList from "./ExchangeList";

export type ExchangeWithBookDetails = Exchange & {
  requestedBook: Book;
} & {
  requesterBook: Book;
};

export default function BookListPage() {
  if (typeof window !== "undefined" && !localStorage.getItem("userId")) {
    redirect("/login");
  }
  const user = useContext(UserContext);

  const { isLoading, data: exchanges } = trpc.exchanges.getMyExchanges.useQuery(
    { userId: user?.id ?? "" }
  );

  const [showAllExchanges, setShowAllExchanges] = useState(false);

  return (
    <>
      <Tabs defaultValue="mine">
        <Tabs.List>
          <Tabs.Tab value="mine">My Exchanges</Tabs.Tab>
          <Tabs.Tab value="requests">Exchange Requests</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="mine">
          <Stack m="lg" gap="md">
            <Grid gutter="md" align="center" justify="space-between">
              <Grid.Col span="content">
                <Title order={2}>My Exchanges</Title>
              </Grid.Col>
              <Grid.Col span="content" style={{ textAlign: "right" }}>
                <Switch
                  checked={showAllExchanges}
                  onChange={(event) =>
                    setShowAllExchanges(event.currentTarget.checked)
                  }
                  label="Show Completed Exchanges"
                  onLabel="ON"
                  offLabel="OFF"
                  size="lg"
                />
              </Grid.Col>
            </Grid>
            <Text hidden={!isLoading} size="md">
              Loading...
            </Text>
            <ExchangeList
              exchanges={
                exchanges?.filter(
                  (exchange) =>
                    exchange.requesterBook.listedById === user?.id &&
                    (showAllExchanges || exchange.status === "PENDING")
                ) ?? []
              }
              userInitiatedExchange={true}
              userId={user?.id ?? ""}
            />
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="requests">
          <Stack m="lg" gap="md">
            <Title order={2}>Exchange Requests</Title>
            <Text hidden={!isLoading} size="md">
              Loading...
            </Text>
            <ExchangeList
              exchanges={
                exchanges?.filter(
                  (exchange) =>
                    exchange.requesterBook.listedById !== user?.id &&
                    exchange.status === "PENDING"
                ) ?? []
              }
              userInitiatedExchange={false}
              userId={user?.id ?? ""}
            />
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
