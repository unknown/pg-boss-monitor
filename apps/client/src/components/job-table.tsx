"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { trpc } from "@/trpc/react";
import { useState } from "react";

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

export function JobsTable({ queue }: JobsTableProps) {
  const [selectedState, setSelectedState] = useState<JobState>("completed");

  const jobs = trpc.pgBoss.getJobs.useQuery({
    queue,
    state: selectedState,
  });

  return (
    <div className="flex flex-col h-full">
      <ToggleGroup
        type="single"
        value={selectedState}
        onValueChange={(state: JobState) => setSelectedState(state)}
      >
        {JobStates.map((jobState) => (
          <ToggleGroupItem key={jobState} value={jobState}>
            {jobState === selectedState && jobs.data
              ? `${jobState} (${jobs.data.length})`
              : jobState}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <Table>
        <TableHeader className="sticky top-0 bg-background">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Completed</TableHead>
            <TableHead className="text-right w-[200px]">
              Duration (seconds)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.data?.map((job) => {
            const { id, data, completedon, startedon } = job;
            const completedonDate = completedon ? new Date(completedon) : null;
            const startedonDate = startedon ? new Date(startedon) : null;
            const duration =
              completedonDate && startedonDate
                ? (
                    (completedonDate.getTime() - startedonDate.getTime()) /
                    1000
                  ).toFixed(2)
                : null;

            return (
              <TableRow key={id} className="max-h-40">
                <TableCell>{id}</TableCell>
                <TableCell>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </TableCell>
                <TableCell title={completedon ?? undefined}>
                  {completedonDate ? completedonDate.toLocaleString() : null}
                </TableCell>
                <TableCell className="text-right">{duration}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
