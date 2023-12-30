"use client";

import { useState } from "react";

import { JobsTable } from "@/components/job-table";
import { QueueList } from "@/components/queue-list";
import { ScheduledTable } from "@/components/scheduled-table";
import { trpc } from "@/trpc/react";

export function QueueView() {
  const queuesQuery = trpc.pgBoss.getQueues.useQuery();
  const [selectedQueue, setSelectedQueue] = useState<string>("scheduled");

  const queues = queuesQuery.data ? ["scheduled", ...queuesQuery.data] : null;

  return (
    <div className="flex flex-row h-screen">
      <QueueList
        selectedQueue={selectedQueue}
        queues={queues}
        onValueChange={setSelectedQueue}
      />
      <div className="flex-1">
        {selectedQueue === "scheduled" ? (
          <ScheduledTable />
        ) : (
          <JobsTable queue={selectedQueue} />
        )}
      </div>
    </div>
  );
}
