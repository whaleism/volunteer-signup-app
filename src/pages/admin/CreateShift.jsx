import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateShift() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id; // true if id exists, false if undefined

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slotsAvailable, setSlotsAvailable] = useState("");
  const [errors, setErrors] = useState({});

  const fakeShifts = [
    {
      id: 1,
      title: "Food Drive - Morning Shift",
      date: "2026-07-10",
      time: "09:00",
      slots_available: 5,
    },
    {
      id: 2,
      title: "Community Cleanup",
      date: "2026-07-14",
      time: "10:00",
      slots_available: 3,
    },
    {
      id: 3,
      title: "Food Drive - Afternoon Shift",
      date: "2026-07-30",
      time: "13:00",
      slots_available: 4,
    },
  ];

  useEffect(() => {
    if (isEditing) {
      const shift = fakeShifts.find((s) => s.id === Number(id));
      if (shift) {
        setTitle(shift.title);
        setDate(shift.date);
        setTime(shift.time);
        setSlotsAvailable(shift.slots_available);
      }
    }
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (title.trim() === "") {
      newErrors.title = "Title";
    }
    if (date.trim() === "") {
      newErrors.date = "Date";
    }
    if (time.trim() === "") {
      newErrors.time = "Time";
    }
    if (!slotsAvailable) {
      newErrors.slotsAvailable = "Slots Available";
    }

    setErrors(newErrors);
    console.log(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form is valid:", { title, date, time, slotsAvailable });
    }
  }

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-[#1a2e28] to-[#2d8c6e] flex items-center justify-center">
      {/* Centered blurred card */}
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-2">
          {isEditing ? "Edit Shift" : "Create A Shift"}
        </h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(errors).length > 0 && (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6"
            >
              Please fill in: {Object.values(errors).join(", ")}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-white/90 mb-1"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              placeholder="Food Shelf - Morning Shift"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d8c6e]"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-white/90 mb-1"
            >
              Date <span className="text-red-500">*</span>
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d8c6e]"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="time"
              className="block text-sm font-medium text-white/90 mb-1"
            >
              Time <span className="text-red-500">*</span>
            </label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d8c6e]"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="slotsAvailable"
              className="block text-sm font-medium text-white/90 mb-1"
            >
              Slots Available <span className="text-red-500">*</span>
            </label>
            <input
              id="slotsAvailable"
              type="number"
              min="1"
              value={slotsAvailable}
              onChange={(e) => setSlotsAvailable(e.target.value)}
              placeholder="0 of 5 filled"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d8c6e]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#2d8c6e] text-white py-2 rounded-lg font-medium hover:bg-[#256f58] transition"
          >
            {isEditing ? "Save Changes" : "Create Shift"}
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="text-sm text-white font-semibold underline decoration-white/50 hover:decoration-white transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
