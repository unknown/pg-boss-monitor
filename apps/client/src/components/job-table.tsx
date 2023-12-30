"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/trpc/react";

interface JobsTableProps {
  queue: string;
  state: string;
}

export function JobsTable({ queue, state }: JobsTableProps) {
  const jobs = trpc.pgBoss.getJobs.useQuery({
    queue,
    state: "completed",
  });

  return (
    <Table>
      <TableCaption>A list of jobs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Data</TableHead>
          <TableHead className="text-right">Duration (seconds)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.data?.map(({ id, name, data, completedon, startedon }) => {
          const duration =
            completedon && startedon
              ? (
                  (new Date(completedon).getTime() -
                    new Date(startedon).getTime()) /
                  1000
                ).toFixed(2)
              : null;

          return (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </TableCell>
              <TableCell className="text-right">{duration}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
