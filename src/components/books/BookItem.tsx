"use client";

import { trpc } from "../../hooks/trpc";
import type { Book } from "@prisma/client";
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

type Props = Readonly<{
  book: Book;
  isOwnBook: boolean;
  onUpdateClick: (book: Book) => void;
  onDeleteClick: (book: Book) => void;
  onExchangeClick: (book: Book) => void;
}>;

export default function BookItem({
  book,
  isOwnBook,
  onUpdateClick,
  onDeleteClick,
  onExchangeClick,
}: Props) {
  const { data: lister } = trpc.users.getUserById.useQuery({
    id: book.listedById,
  });
  return (
    <Card mb="md" padding="lg" radius="md" shadow="sm" withBorder={true}>
      <Title order={3}>
        {book.title} by {book.author}
      </Title>
      <Text size="sm">{book.summary}</Text>
      <Divider my="md" />
      {isOwnBook ? (
        <Group justify="space-between" mb="xs" mt="md">
          <Button onClick={() => onUpdateClick(book)}>Update Listing</Button>
          <Button onClick={() => onDeleteClick(book)} color="red">
            Delete Listing
          </Button>
        </Group>
      ) : (
        <Group justify="space-between" mb="xs" mt="md">
          <Text size="sm">
            Posted by{" "}
            <Anchor href={`/profile/${lister?.id}`}>{lister?.name}</Anchor>
          </Text>
          <Button onClick={() => onExchangeClick(book)}>Offer Exchange</Button>
        </Group>
      )}
    </Card>
  );
}
