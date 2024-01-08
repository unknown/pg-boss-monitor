"use client";

import { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/ui/data-table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { trpc } from "@/trpc/react";
import { Button } from "@/components/ui/button";

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
  data: Record<string, unknown>;
  completedon: string | null;
  startedon: string | null;
};

const columns: ColumnDef<Job>[] = [
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
    accessorKey: "data",
    cell: (info) => (
      <pre className="max-h-64 max-w-[540px] overflow-auto border p-2 rounded-md bg-muted/50">
        {JSON.stringify(info.getValue(), null, 2)}
      </pre>
    ),
    header: "Data",
  },
  {
    accessorKey: "output",
    cell: (info) => (
      <pre className="max-h-64 max-w-[540px] overflow-auto border p-2 rounded-md bg-muted/50">
        {JSON.stringify(info.getValue(), null, 2)}
      </pre>
    ),
    header: "Output",
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
  const limit = 25;
  const [offset, setOffset] = useState(0);

  const jobs = trpc.pgBoss.getJobs.useQuery({
    queue,
    limit,
    offset,
    state: selectedState,
  });

  const jobsCount = trpc.pgBoss.countJobs.useQuery({
    queue,
    state: selectedState,
  });

  return (
    <div className="flex flex-col h-full border-l divide-y">
      <div className="flex items-center p-2 gap-2">
        <ToggleGroup
          type="single"
          value={selectedState}
          onValueChange={(state: JobState) => {
            setSelectedState(state);
            setOffset(0);
          }}
        >
          {JobStates.map((jobState) => (
            <ToggleGroupItem key={jobState} value={jobState}>
              {jobState}
              {selectedState === jobState &&
                ` (${jobsCount.isLoading ? "..." : jobsCount.data})`}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex items-center p-2 gap-2">
        <Button
          variant="outline"
          onClick={() => setOffset((offset) => Math.max(0, offset - limit))}
          disabled={offset === 0}
        >
          {"<"}
        </Button>
        <p className="tabular-nums">{limit}</p>
        <p className="tabular-nums">{offset}</p>
        <Button
          variant="outline"
          onClick={() =>
            setOffset((offset) =>
              Math.min(offset + limit, jobsCount.data ?? limit)
            )
          }
          disabled={offset + limit >= (jobsCount.data ?? limit)}
        >
          {">"}
        </Button>
      </div>
      {jobs.data === undefined ? null : (
        <DataTable columns={columns} data={jobs.data} />
      )}
    </div>
  );
}
