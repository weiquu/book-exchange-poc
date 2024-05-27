"use client";

import { redirect } from "next/navigation";
import { trpc } from "../../hooks/trpc";
import "@mantine/core/styles.css";
import React from "react";
import BookList from "../books/BookList";
import { Box, Button, Group, Modal, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ProfileEditForm from "./ProfileEditForm";

type Props = Readonly<{
  userId: string;
}>;

export default function ProfilePage({ userId }: Props) {
  if (typeof window !== "undefined" && !localStorage.getItem("userId")) {
    redirect("/login");
  }

  const { isLoading, data: books } = trpc.books.getMyListings.useQuery({
    userId: userId,
  });
  const { data: user } = trpc.users.getUserById.useQuery({ id: userId });
  const isOwnProfile = localStorage.getItem("userId") === userId;

  const [editOpened, { open: editOpen, close: editClose }] =
    useDisclosure(false);

  return (
    <>
      <Box m="lg">
        <Group justify="space-between">
          <Title mb="md" order={2}>
            Profile of {user?.name}
          </Title>
          {isOwnProfile && <Button onClick={editOpen}>Edit Profile</Button>}
        </Group>
        <Stack m="lg" gap="md">
          <Title order={3}>Books for Exchange</Title>
          <Text hidden={!isLoading} size="md">
            Loading...
          </Text>
          <BookList books={books} userId={user?.id ?? ""} />
        </Stack>
      </Box>

      {user && (
        <Modal
          opened={editOpened}
          withCloseButton
          onClose={editClose}
          title="Update Exchange"
        >
          <ProfileEditForm user={user} onSubmit={editClose} />
        </Modal>
      )}
    </>
  );
}
