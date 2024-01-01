"use client";

import { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { VirtualizedDataTable } from "@/components/ui/virtualized-data-table";
import { trpc } from "@/trpc/react";

const JobStates = [
  "created",
  "retry",
  "active",
  "completed",
  "expired",
  "cancelled",
  "failed",
] as const;

type JobState = (typeof JobStates)[number];
interface JobsTableProps {
  queue: string;
}

type Job = {
  id: string;
  data: Record<string, unknown>;
  completedon: string | null;
  startedon: string | null;
};

const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 400,
  },
  {
    accessorKey: "data",
    cell: (info) => <pre>{JSON.stringify(info.getValue(), null, 2)}</pre>,
    header: "Data",
    size: 400,
  },
  {
    accessorFn: (row) => {
      if (!row.completedon) {
        return null;
      }
      return new Date(row.completedon).toLocaleString();
    },
    header: "Completed",
    size: 400,
  },
  {
    accessorFn: (row) => {
      if (!row.completedon || !row.startedon) {
        return null;
      }
      const startedonDate = new Date(row.startedon);
      const completedonDate = new Date(row.completedon);
      const duration = completedonDate.getTime() - startedonDate.getTime();
      return (duration / 1000).toFixed(2);
    },
    header: "Duration (seconds)",
    size: 200,
  },
];

export function JobsTable({ queue }: JobsTableProps) {
  const [selectedState, setSelectedState] = useState<JobState>("completed");

  const jobs = trpc.pgBoss.getJobs.useQuery({
    queue,
    state: selectedState,
  });

  return (
    <div className="flex flex-col h-full">
      <ToggleGroup
        className="p-2"
        type="single"
        value={selectedState}
        onValueChange={(state: JobState) => setSelectedState(state)}
      >
        {JobStates.map((jobState) => (
          <ToggleGroupItem key={jobState} value={jobState}>
            {jobState}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {jobs.data === undefined ? (
        "Loading..."
      ) : (
        <VirtualizedDataTable columns={columns} data={jobs.data} />
      )}
    </div>
  );
}
