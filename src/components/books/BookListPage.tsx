"use client";

import { useContext } from "react";
import { redirect } from "next/navigation";
import { UserContext } from "../global/UserProvider";
import { trpc } from "../../hooks/trpc";
import BookList from "./BookList";
import "@mantine/core/styles.css";
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import AddBookForm from "./AddBookForm";
import { Button, Grid, Modal, Stack, Text, Title, Tabs } from "@mantine/core";

export default function BookListPage() {
  if (typeof window !== "undefined" && !localStorage.getItem("userId")) {
    redirect("/login");
  }
  const user = useContext(UserContext);
  if (!user) {
    // TODO: I believe this is causing a second reload
    redirect("/login");
  }

  const { isLoading: isLoadingAll, data: allBooks } =
    trpc.books.getAllListings.useQuery();
  const { isLoading: isLoadingMine, data: myBooks } =
    trpc.books.getMyListings.useQuery({ userId: user.id });

  const [opened, { open, close }] = useDisclosure(false);

  function getTabPanel(value: string) {
    return (
      <Stack m="lg" gap="md">
        <Grid gutter="md" align="center" justify="space-between">
          <Grid.Col span={6}>
            <Title order={2}>
              {value === "all"
                ? "All Books for Exchange"
                : "My Books for Exchange"}
            </Title>
          </Grid.Col>
          <Grid.Col span={6} style={{ textAlign: "right" }}>
            <Button onClick={open}>Add Book</Button>
          </Grid.Col>
        </Grid>
        <Text
          hidden={value === "all" ? !isLoadingAll : !isLoadingMine}
          size="md"
        >
          Loading...
        </Text>
        <BookList books={value === "all" ? allBooks : myBooks} />
      </Stack>
    );
  }

  return (
    <>
      <Tabs defaultValue="all">
        <Tabs.List>
          <Tabs.Tab value="all">All Listings</Tabs.Tab>
          <Tabs.Tab value="mine">My Listings</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="all">{getTabPanel("all")}</Tabs.Panel>

        <Tabs.Panel value="mine">{getTabPanel("mine")}</Tabs.Panel>
      </Tabs>

      <Modal opened={opened} onClose={close} title="Add Book">
        <AddBookForm onSubmit={close} userId={user.id} />
      </Modal>
    </>
  );
}
