"use client";

import Link from "next/link";
import "@mantine/core/styles.css";
import { Box, Button, Title } from "@mantine/core";

export default function LandingPage() {
  return (
    <Box m="lg">
      <Title mb="md" order={2}>
        Hello! Welcome to our peer-to-peer exchange platform for books
      </Title>
      <Button component={Link} href="/login">
        Login
      </Button>
    </Box>
  );
}
