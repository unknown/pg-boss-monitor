import { JobList } from "@/components/job-list";
import { ScheduleList } from "@/components/schedule-list";

export default function Home() {
  return (
    <main>
      <h1 className="text-xl">pg-boss-studio</h1>
      <div className="flex flex-row justify-stretch items-start">
        <ScheduleList />
        <JobList />
      </div>
    </main>
  );
}
