"use client";

import { Button, TextInput, PasswordInput } from "@mantine/core";
import { hasLength, useForm, isEmail } from "@mantine/form";
import { trpc } from "../../hooks/trpc";
import "@mantine/core/styles.css";
import type { User } from "@prisma/client";
import React from "react";

type Props = Readonly<{
  user: User;
  onSubmit: () => void;
}>;

// TODO: refactor this with the other forms
export default function ProfileEditForm({ user, onSubmit }: Props) {
  const utils = trpc.useUtils();
  const updateUserMutation = trpc.users.updateUser.useMutation({
    onSuccess: () => {
      utils.users.getUserById.invalidate({ id: user.id });
      onSubmit();
    },
    onError: () => {
      // TODO: show error message
      console.error("Failed to update user");
    },
  });
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: user.name,
      email: user.email,
      password: "",
    },
    validate: {
      name: hasLength({ min: 3 }, "Must be at least 3 characters"),
      email: isEmail("Invalid email"),
      password: hasLength({ min: 8 }, "Must be at least 8 characters"),
    },
  });

  function updateUser(values: typeof form.values) {
    updateUserMutation.mutateAsync({
      id: user.id,
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }

  return (
    <form onSubmit={form.onSubmit(updateUser)}>
      <TextInput
        {...form.getInputProps("name")}
        label="Name"
        placeholder="name"
      />
      <TextInput
        {...form.getInputProps("email")}
        label="Email"
        placeholder="email@email.com"
      />
      <PasswordInput
        {...form.getInputProps("password")}
        mt="md"
        label="password"
        placeholder="password"
      />
      <Button type="submit" mt="md">
        Submit
      </Button>
    </form>
  );
}
