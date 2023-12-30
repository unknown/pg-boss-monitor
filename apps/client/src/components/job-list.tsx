"use client";

import { trpc } from "@/trpc/react";

export function JobList() {
  const jobs = trpc.pgBoss.getJobs.useQuery({ state: "completed" });
  return (
    <div>
      <h2 className="text-lg">Jobs</h2>
      <div className="grid">
        {jobs.data?.map((job) => (
          <p key={job.id}>{job.name}</p>
        ))}
      </div>
    </div>
  );
}
