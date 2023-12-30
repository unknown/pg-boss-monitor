import { twMerge } from "tailwind-merge";

import { Button } from "@/components/ui/button";

interface QueueListProps {
  queues: string[] | null;
  selectedQueue: string;
  onValueChange: (queue: string) => void;
}

export function QueueList({
  queues,
  selectedQueue,
  onValueChange,
}: QueueListProps) {
  return (
    <div className="p-2">
      <nav className="grid gap-1">
        {queues?.map((queue) => (
          <Button
            key={queue}
            variant={selectedQueue === queue ? "default" : "ghost"}
            className={twMerge("justify-start")}
            onClick={() => {
              if (selectedQueue !== queue) {
                onValueChange(queue);
              }
            }}
          >
            {queue}
          </Button>
        ))}
      </nav>
    </div>
  );
}
