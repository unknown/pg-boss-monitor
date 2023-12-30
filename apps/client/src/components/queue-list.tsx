"use client";

import { trpc } from "@/trpc/react";

export function QueueList() {
  const queues = trpc.pgBoss.getQueues.useQuery();
  return (
    <div>
      <h2 className="text-lg">Queues</h2>
      <div className="grid">
        {queues.data?.map((queue) => (
          <p key={queue}>{queue}</p>
        ))}
      </div>
    </div>
  );
}
