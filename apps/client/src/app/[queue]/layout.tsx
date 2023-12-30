import { QueueTable } from "@/components/queue-table";

export default function QueueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-row">
      <QueueTable />
      <div className="flex-1">{children}</div>
    </main>
  );
}
