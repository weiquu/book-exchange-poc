"use client";

import Link from "next/link";
import "@mantine/core/styles.css";
import { Box, Button, Text, Title } from "@mantine/core";

export default function LandingPage() {
  return (
    <Box m="lg">
      <Title mb="md" order={2}>
        Hello! Welcome
      </Title>
      <Button component={Link} href="/login">
        Login
      </Button>
    </Box>
  );
}
