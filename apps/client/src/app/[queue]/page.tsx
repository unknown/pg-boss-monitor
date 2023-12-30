import { JobsTable } from "@/components/job-table";
import { ScheduleList } from "@/components/schedule-list";

interface QueuePageProps {
  params: {
    queue: string;
  };
}

export default function QueuePage({ params }: QueuePageProps) {
  const { queue } = params;

  return (
    <div className="flex flex-row justify-stretch items-start">
      {queue === "scheduled" ? <ScheduleList /> : <JobsTable queue={queue} />}
    </div>
  );
}
