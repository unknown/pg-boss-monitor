"use client";

import { trpc } from "@/trpc/react";

export function JobList() {
  const jobs = trpc.pgBoss.getJobs.useQuery();
  return (
    <div>
      <h2 className="text-lg">Jobs</h2>
      <div className="grid">
        {jobs.data?.map((job, i) => (
          <p key={i}>{job.name}</p>
        ))}
      </div>
    </div>
  );
}
