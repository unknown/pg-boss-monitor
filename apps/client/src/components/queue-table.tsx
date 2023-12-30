"use client";

import { buttonVariants } from "@/components/ui/button";
import { trpc } from "@/trpc/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function QueueTable() {
  const params = useParams<{ queue: string }>();

  const selectedQueue = params.queue;

  const queues = trpc.pgBoss.getQueues.useQuery();
  if (!queues.data) {
    return null;
  }

  return (
    <div>
      <nav className="grid">
        {["scheduled", ...queues.data].map((queue) => (
          <Link
            key={queue}
            href={`/${queue}`}
            className={twMerge(
              buttonVariants({
                variant: selectedQueue === queue ? "default" : "ghost",
              }),
              "justify-start"
            )}
          >
            {queue}
          </Link>
        ))}
      </nav>
    </div>
  );
}
