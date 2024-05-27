'use client';

import { type ChangeEvent } from 'react';

import type { Book } from '@prisma/client';

import '@mantine/core/styles.css';

import {
  Button,
  Card,
  Divider,
  Group,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';

type Props = Readonly<{
  book: Book;
}>;

export default function BookItem({ book }: Props) {
  return (
    <Card mb="md" padding="lg" radius="md" shadow="sm" withBorder={true}>
      <Group justify="space-between" mb="xs" mt="md">
        <Title order={3}>Title: {book.title}</Title>
        <Text size="sm">Posted At: {book.createdAt.toString()}</Text>
      </Group>
      <Text size="sm">{book.author}</Text>
      <Divider my="md" />
      <Textarea
        autosize={true}
        label="extra"
        value='info'
      />
      <Group justify="space-between" mb="xs" mt="md">
        <Button onClick={() => console.info('click!')}>Generate Response</Button>
      </Group>
      <Group justify="space-between" mb="xs" mt="md">
        <Button onClick={() => console.info('click!')}>Update Response</Button>
        <Button onClick={() => console.info('click!')}>Reply</Button>
      </Group>
    </Card>
  );
}
