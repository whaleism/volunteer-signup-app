import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../components/EmptyState";
import SkeletonCard from "../../components/SkeletonCard";
import { getShiftDay } from "../../lib/dateHelper";

export default function AdminDashboard() {
  const [fakeShifts, setFakeShifts] = useState([
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
  ]);

  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState("all");
  const navigate = useNavigate();

  const filteredShifts = fakeShifts.filter((shift) => {
    if (selectedDay === "all") {
      return true;
    } else if (getShiftDay(shift.date) === selectedDay) {
      return true;
    } else {
      return false;
    }
  });

  function handleCreateShift() {
    navigate("/admin/shifts/new");
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this shift?",
    );

    if (confirmed) {
      setFakeShifts(fakeShifts.filter((shift) => shift.id !== id));
    }
  }

  return (
    <div className="bg-[#f0f7f4] min-h-screen">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-8 pt-12 pb-4">
        <h1 className="text-3xl font-bold text-[#1a2e28] mb-2">
          Admin Dashboard
        </h1>
        <p className="text-[#6b8f84]">
          Here you'll be able to add, cancel, edit, and view shifts.
        </p>
      </div>
      <div className="flex gap-3 max-w-5xl mx-auto px-8 mb-6">
        <button
          onClick={handleCreateShift}
          aria-label="Create a new volunteer shift"
          className="bg-[#e8f5f0] text-[#2d8c6e] px-4 py-2 rounded-lg"
        >
          Create a new shift
        </button>
        <button
          onClick={() => setSelectedDay("all")}
          aria-pressed={selectedDay === "all"}
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
          aria-pressed={selectedDay === "Tuesday"}
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
          aria-pressed={selectedDay === "Friday"}
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
          title="No shifts right now"
          message="Create a new shift for volunteers"
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
                onClick={() => navigate(`/admin/shifts/${shift.id}`)}
                aria-label={`View details for ${shift.title}`}
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && navigate(`/admin/shifts/${shift.id}`)
                }
                className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold text-[#1a2e28] mb-2">
                  {shift.title}
                </h2>
                <p className="text-sm text-[#6b8f84] mb-1">
                  {shift.date} · {shift.time}
                </p>
                <p className="text-sm text-[#6b8f84] mb-4">
                  {shift.slots_taken} of {shift.slots_available} filled
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/shifts/${shift.id}/edit`);
                    }}
                    aria-label={`Edit ${shift.title}`}
                    className="bg-[#2d8c6e] text-white px-4 py-2 rounded-lg hover:bg-[#256f58] transition flex-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(shift.id);
                    }}
                    aria-label={`Delete ${shift.title}`}
                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition flex-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
