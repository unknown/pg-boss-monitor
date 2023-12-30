"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/trpc/react";

export function ScheduleList() {
  const schedules = trpc.pgBoss.getSchedules.useQuery();

  return (
    <div className="flex flex-col h-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Cron</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.data?.map((job) => {
            const { name, cron, data } = job;

            return (
              <TableRow key={name}>
                <TableCell>{name}</TableCell>
                <TableCell>{cron}</TableCell>
                <TableCell>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
