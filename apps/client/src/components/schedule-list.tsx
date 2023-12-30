"use client";

import { trpc } from "@/trpc/react";

export function ScheduleList() {
  const schedules = trpc.pgBoss.getSchedules.useQuery();
  return (
    <div>
      <h2 className="text-lg">Scheduled</h2>
      <div className="grid"></div>
      <div className="grid">
        {schedules.data?.map((schedule, i) => (
          <p key={i}>{schedule.name}</p>
        ))}
      </div>
    </div>
  );
}
