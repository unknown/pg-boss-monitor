import { ReactNode } from "react";

import { QueueTable } from "@/components/queue-table";

export default function QueueLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-row h-screen">
      <QueueTable />
      <div className="flex-1">{children}</div>
    </main>
  );
}
