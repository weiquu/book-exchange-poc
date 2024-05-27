"use client";

import type { Book } from "@prisma/client";
import BookItem from "./BookItem";
import { trpc } from "../../hooks/trpc";

import "@mantine/core/styles.css";
import { Button, Container, Dialog, Group, Modal, Text } from "@mantine/core";
import UpdateBookForm from "./UpdateBookForm";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

type Props = Readonly<{
  books?: Book[];
  userId: string;
}>;

export default function BookList({ books, userId }: Props) {
  // TODO: search and filter options
  // TODO: pagination?
  const utils = trpc.useUtils();
  const [updateOpened, { open: updateOpen, close: updateClose }] =
    useDisclosure(false);
  const [deleteOpened, { open: deleteOpen, close: deleteClose }] =
    useDisclosure(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const deleteBookMutation = trpc.books.deleteListing.useMutation({
    onSuccess: () => {
      utils.books.getAllListings.invalidate();
      utils.books.getMyListings.invalidate();
      deleteClose();
    },
    onError: () => {
      // TODO: show error message
      console.error("Failed to delete book");
    },
  });

  const deleteBook = (bookId: string) => {
    deleteBookMutation.mutateAsync({ id: bookId });
  };

  return (
    <>
      <Container>
        {books?.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            isOwnBook={userId === book.listedById}
            onUpdateClick={(book: Book) => {
              setSelectedBook(book);
              updateOpen();
            }}
            onDeleteClick={(book: Book) => {
              setSelectedBook(book);
              deleteOpen();
            }}
          ></BookItem>
        ))}
      </Container>

      {selectedBook && (
        <Modal
          opened={updateOpened}
          withCloseButton
          onClose={updateClose}
          title="Add Book"
        >
          <UpdateBookForm book={selectedBook} onSubmit={updateClose} />
        </Modal>
      )}

      {selectedBook && (
        <Modal
          opened={deleteOpened}
          withCloseButton
          onClose={deleteClose}
          title="Delete Book"
        >
          <Text>Are you sure you want to delete this book?</Text>
          <Group justify="space-between" mb="xs" mt="md">
            <Button onClick={deleteClose} color="gray">
              Cancel
            </Button>
            <Button onClick={() => deleteBook(selectedBook.id)} color="red">
              Delete
            </Button>
          </Group>
        </Modal>
      )}
    </>
  );
}
