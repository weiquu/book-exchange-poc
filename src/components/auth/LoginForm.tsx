"use client";

import { redirect } from "next/navigation";
import { Button, TextInput, PasswordInput } from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { trpc } from "../../hooks/trpc";
import { useState, useEffect, use } from "react";
import "@mantine/core/styles.css";
import React from "react";

export default function LoginForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "", password: "" },
    validate: {
      email: isEmail("Invalid email"),
      password: isNotEmpty("Enter a password"),
    },
  });

  const [submittedValues, setSubmittedValues] = useState<
    typeof form.values | null
  >(null);

  const { data, refetch } = trpc.users.validateLogin.useQuery(
    {
      email: submittedValues?.email ?? "",
      password: submittedValues?.password ?? "",
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  // TODO: bug - user needs to press submit twice
  function validateLogin(values: typeof form.values) {
    setSubmittedValues(values);
    refetch();
  }

  useEffect(() => {
    if (!submittedValues) {
      return;
    }

    if (!data) {
      console.error("Invalid login"); // TODO: show error message
    } else {
      localStorage.setItem("userId", data.id); // TODO: use token or something
      redirect("/books");
    }
  }, [data]);

  return (
    <form onSubmit={form.onSubmit(validateLogin)}>
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
