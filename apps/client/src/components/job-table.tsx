"use client";

import { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DataTable } from "@/components/ui/data-table";
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
  },
  {
    accessorKey: "data",
    cell: (info) => <pre>{JSON.stringify(info.getValue(), null, 2)}</pre>,
    header: "Data",
  },
  {
    accessorKey: "completedon",
    header: "Completed",
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
  },
];

export function JobsTable({ queue }: JobsTableProps) {
  const [selectedState, setSelectedState] = useState<JobState>("completed");

  const jobs = trpc.pgBoss.getJobs.useQuery({
    queue,
    state: selectedState,
  });

  return (
    <>
      <ToggleGroup
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
      {jobs.data && <DataTable columns={columns} data={jobs.data} />}
    </>
  );
}
