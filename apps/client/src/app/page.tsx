import { QueueTable } from "@/components/queue-table";

export default function Home() {
  return (
    <main>
      <h1 className="text-xl">pg-boss-studio</h1>
      <QueueTable />
    </main>
  );
}
