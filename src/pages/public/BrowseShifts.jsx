import EmptyState from "../../components/EmptyState";

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
    date: "2026-07-12",
    time: "10:00 AM",
    slots_available: 3,
    slots_taken: 3,
  },
  {
    id: 3,
    title: "Food Drive - Afternoon Shift",
    date: "2026-07-15",
    time: "1:00 PM",
    slots_available: 4,
    slots_taken: 1,
  },
];

export default function BrowseShifts() {
  return (
    <div className="bg-[#f0f7f4] min-h-screen">
      <div className="max-w-5xl mx-auto px-8 pt-12 pb-4">
        <h1 className="text-3xl font-bold text-[#1a2e28] mb-2">
          Upcoming Volunteer Shifts
        </h1>
        <p className="text-[#6b8f84]">
          Find a shift that fits your schedule and sign up to help out.
        </p>
      </div>
      {fakeShifts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 max-w-5xl mx-auto">
          {fakeShifts.map((shift) => {
            const remaining = shift.slots_available - shift.slots_taken;

            return (
              <div key={shift.id} className="bg-white rounded-xl shadow-md p-6">
                <span className="inline-block bg-[#e8f5f0] text-[#2d8c6e] text-xs font-semibold px-3 py-1 rounded-full mb-3">
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
