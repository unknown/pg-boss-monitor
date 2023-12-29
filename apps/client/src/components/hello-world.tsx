"use client";

import { trpc } from "@/trpc/react";

export function HelloWorld() {
  const helloWorldQuery = trpc.helloWorld.useQuery();
  return <span>{helloWorldQuery.data}</span>;
}
