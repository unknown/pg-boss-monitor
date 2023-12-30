import { QueueTable } from "@/components/queue-table";

export default function Home() {
  return (
    <main>
      <h1 className="text-xl">pg-boss-monitor</h1>
      <QueueTable />
    </main>
  );
}
