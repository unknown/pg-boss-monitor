import { JobsTable } from "@/components/job-table";
import { ScheduleList } from "@/components/schedule-list";

interface QueuePageProps {
  params: {
    queue: string;
  };
}

export default function QueuePage({ params }: QueuePageProps) {
  const { queue } = params;

  return queue === "scheduled" ? <ScheduleList /> : <JobsTable queue={queue} />;
}
