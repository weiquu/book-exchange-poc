"use client";

import { Button, TextInput, PasswordInput } from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { trpc } from "../../hooks/trpc";
import React from "react";
import "@mantine/core/styles.css";

export default function SignUpForm() {
  const createUserMutation = trpc.users.createUser.useMutation();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { name: "", email: "", password: "" },
    validate: {
      name: hasLength({ min: 3 }, "Must be at least 3 characters"),
      email: isEmail("Invalid email"),
      password: hasLength({ min: 8 }, "Must be at least 8 characters"),
    },
  });

  function signUp(values: typeof form.values) {
    const success = createUserMutation.mutateAsync({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    // TODO: use onSuccess and onError in the mutation
    console.info("success", success);
    // TODO: redirect on success, show error message on failure
  }

  return (
    <form onSubmit={form.onSubmit(signUp)}>
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
