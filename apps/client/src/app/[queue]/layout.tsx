import { QueueTable } from "@/components/queue-table";

export default function QueueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <QueueTable />
      <div className="flex-1">{children}</div>
    </div>
  );
}
