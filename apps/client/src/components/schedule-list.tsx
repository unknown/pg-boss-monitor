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

export function ScheduleList() {
  const schedules = trpc.pgBoss.getSchedules.useQuery();

  return (
    <Table>
      <TableCaption>A list of scheduled jobs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Cron</TableHead>
          <TableHead>Data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedules.data?.map(({ name, cron, data }) => {
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
  );
}
