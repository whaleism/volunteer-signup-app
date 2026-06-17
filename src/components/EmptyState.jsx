import { CalendarX } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16 text-center">
      <CalendarX className="w-12 h-12 text-[#6b8f84] mx-auto mb-4" />
      <h2 className="text-xl font-bold text-[#1a2e28] mb-2">
        No upcoming shifts right now
      </h2>
      <p className="text-[#6b8f84]">
        Check back soon - new opportunities are posted regularly.
      </p>
    </div>
  );
}
