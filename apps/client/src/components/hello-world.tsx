"use client";

import { trpc } from "@/trpc/react";

export function HelloWorld() {
  const schedules = trpc.pgBoss.getSchedules.useQuery();
  return (
    <span>{schedules.data?.map((schedule) => schedule.name).join(" ")}</span>
  );
}
