"use client";

import { Button, TextInput, PasswordInput } from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { trpc } from "../../hooks/trpc";
import React from "react";
import { useRouter } from "next/navigation";
import "@mantine/core/styles.css";

export default function SignUpForm() {
  const router = useRouter();

  const createUserMutation = trpc.users.createUser.useMutation({
    onSuccess: (user) => {
      localStorage.setItem("userId", user.id); // TODO: use token or something
      router.push("/books");
    },
    onError: (error) => {
      // TODO: show error message
      console.error(error);
    },
  });
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
    createUserMutation.mutateAsync({
      name: values.name,
      email: values.email,
      password: values.password,
    });
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
        mt="md"
        label="Email"
        placeholder="email@email.com"
      />
      <PasswordInput
        {...form.getInputProps("password")}
        mt="md"
        label="Password"
        placeholder="password"
      />
      <Button fullWidth type="submit" mt="md">
        Submit
      </Button>
    </form>
  );
}
