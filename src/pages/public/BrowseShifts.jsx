import { useState, useEffect } from "react";
import EmptyState from "../../components/EmptyState";
import SkeletonCard from "../../components/SkeletonCard";
import { getShiftDay } from "../../lib/dateHelper";

const fakeShifts = [
  {
    id: 1,
    title: "Food Drive - Morning Shift",
    date: "2026-07-10",
    time: "9:00 AM",
    slots_available: 5,
    slots_taken: 2,
  },
  {
    id: 2,
    title: "Community Cleanup",
    date: "2026-07-14",
    time: "10:00 AM",
    slots_available: 3,
    slots_taken: 3,
  },
  {
    id: 3,
    title: "Food Drive - Afternoon Shift",
    date: "2026-07-30",
    time: "1:00 PM",
    slots_available: 4,
    slots_taken: 1,
  },
];

export default function BrowseShifts() {
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState("all");

  const filteredShifts = fakeShifts.filter((shift) => {
    if (selectedDay === "all") {
      return true;
    } else if (getShiftDay(shift.date) === selectedDay) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <div className="bg-[#f0f7f4] min-h-screen">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-8 pt-12 pb-4">
        <h1 className="text-3xl font-bold text-[#1a2e28] mb-2">
          Upcoming Volunteer Shifts
        </h1>
        <p className="text-[#6b8f84]">
          Find a shift that fits your schedule and sign up to help out.
        </p>
      </div>
      <div className="flex gap-3 max-w-5xl mx-auto px-8 mb-6">
        <button
          onClick={() => setSelectedDay("all")}
          className={
            selectedDay === "all"
              ? "bg-[#2d8c6e] text-white px-4 py-2 rounded-lg"
              : "bg-[#e8f5f0] text-[#2d8c6e] px-4 py-2 rounded-lg"
          }
        >
          All
        </button>
        <button
          onClick={() => setSelectedDay("Tuesday")}
          className={
            selectedDay === "Tuesday"
              ? "bg-[#2d8c6e] text-white px-4 py-2 rounded-lg"
              : "bg-[#e8f5f0] text-[#2d8c6e] px-4 py-2 rounded-lg"
          }
        >
          Tuesday
        </button>
        <button
          onClick={() => setSelectedDay("Friday")}
          className={
            selectedDay === "Friday"
              ? "bg-[#2d8c6e] text-white px-4 py-2 rounded-lg"
              : "bg-[#e8f5f0] text-[#2d8c6e] px-4 py-2 rounded-lg"
          }
        >
          Friday
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 max-w-5xl mx-auto">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : fakeShifts.length === 0 ? (
        <EmptyState
          title="No upcoming shifts right now"
          message="Check back soon - new opportunities are posted regularly."
        />
      ) : (
        <div
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 max-w-5xl mx-auto"
        >
          {filteredShifts.map((shift) => {
            const remaining = shift.slots_available - shift.slots_taken;

            return (
              <div
                key={shift.id}
                role="listitem"
                className="bg-white rounded-xl shadow-md p-6"
              >
                <span
                  role="status"
                  className="inline-block bg-[#e8f5f0] text-[#2d8c6e] text-xs font-semibold px-3 py-1 rounded-full mb-3"
                >
                  Upcoming
                </span>
                <h2 className="text-xl font-bold text-[#1a2e28] mb-2">
                  {shift.title}
                </h2>
                <p className="text-sm text-[#6b8f84] mb-1">
                  {shift.date} · {shift.time}
                </p>
                <p className="text-sm text-[#6b8f84] mb-4">
                  {remaining} slots remaining
                </p>
                <button
                  disabled={remaining === 0}
                  aria-label={
                    remaining === 0
                      ? `${shift.title} is full`
                      : `Sign up for ${shift.title}`
                  }
                  className={
                    remaining === 0
                      ? "bg-gray-200 text-gray-400 px-4 py-2 rounded-lg cursor-not-allowed w-full"
                      : "bg-[#2d8c6e] text-white px-4 py-2 rounded-lg hover:bg-[#256f58] transition w-full"
                  }
                >
                  {remaining === 0 ? "Full" : "Sign Up"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
