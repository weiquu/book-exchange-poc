"use client";

import { Center, Container, Text, Paper, Anchor } from "@mantine/core";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useState } from "react";
import "@mantine/core/styles.css";
import React from "react";

type AuthType = "login" | "signUp";

type Props = Readonly<{
  type: AuthType;
}>;

export default function AuthPage({ type }: Props) {
  const [authType, setAuthType] = useState<AuthType>(type);

  const linkToSignUp = (
    <Text ta="center" size="lg">
      Don't have an account?{" "}
      <Anchor underline="always" onClick={() => setAuthType("signUp")}>
        Sign up
      </Anchor>{" "}
      now!
    </Text>
  );

  const linkToLogin = (
    <Text ta="center" size="lg">
      Already have an account?{" "}
      <Anchor onClick={() => setAuthType("login")}>Log in</Anchor> now!
    </Text>
  );

  return (
    <Center className="gap-6" bg="var(--mantine-color-gray-light)">
      <Text ta="center" size="xl">
        {authType === "login" ? "Log In" : "Sign up"}
      </Text>
      <Container
        className="gap-6"
        bg="var(--mantine-color-gray-light)"
        size="md"
      >
        {authType === "login" ? <LoginForm /> : <SignUpForm />}
      </Container>
      <Text ta="center" size="lg">
        {authType === "login" ? linkToSignUp : linkToLogin}
      </Text>
    </Center>
  );
}
