import { use, useState } from "react";
import { getShiftDay } from "../../lib/dateHelper";
import EmptyState from "../../components/EmptyState";

const fakeVolunteer = {
  name: "Jane Smith",
  email: "jane.smith@email.com",
  phone: "773-555-1234",
};

export default function MyShifts() {
  const [myShifts, setMyShifts] = useState([
    {
      signupId: 101,
      shift: {
        id: 1,
        title: "Food Drive - Morning Shift",
        date: "2026-07-07",
        time: "9:00 AM",
      },
    },
    {
      signupId: 102,
      shift: {
        id: 3,
        title: "Food Drive - Afternoon Shift",
        date: "2026-07-10",
        time: "1:00 PM",
      },
    },
  ]);

  function handleCancel(signupId) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this shift?",
    );

    if (confirmed) {
      setMyShifts(myShifts.filter((signup) => signup.signupId !== signupId));
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f7f4]">
      {/* Page title - spans full width */}
      <div className="max-w-5xl mx-auto px-8 pt-12 pb-4">
        <h1 className="text-3xl font-bold text-[#1a2e28]">My Dashboard</h1>
      </div>

      {/* Two column layout below title */}
      <div className="flex max-w-5xl mx-auto px-8 gap-6">
        {/* Left Panel - Profile */}
        <div className="w-1/3">
          <h2 className="text-xl font-bold text-[#1a2e28] mb-2">
            Volunteer Profile
          </h2>
          {/* Profile details */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-lg font-bold text-[#1a2e28] mb-3">
              {fakeVolunteer.name}
            </p>
            <p className="text-sm text-[#6b8f84] mb-1">{fakeVolunteer.email}</p>
            <p className="text-sm text-[#6b8f84] mb-1">{fakeVolunteer.phone}</p>
          </div>
        </div>

        {/* Right panel - My Shifts */}
        <div className="w-2/3">
          <h2 className="text-xl font-bold text-[#1a2e28] mb-2">
            My Upcoming Shifts
          </h2>
          {myShifts.length === 0 ? (
            <EmptyState
              title="You haven't signed up for any shifts yet"
              message="Browse available shifts and sign up to get started."
            />
          ) : (
            <div role="list">
              {myShifts.map((signup) => (
                <div
                  key={signup.signupId}
                  role="listitem"
                  className="bg-white rounded-xl shadow-md p-4 mb-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-[#1a2e28]">
                      {signup.shift.title}
                    </h3>
                    <p className="text-sm text-[#6b8f84]">
                      {getShiftDay(signup.shift.date)}, {signup.shift.date} ·{" "}
                      {signup.shift.time}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCancel(signup.signupId)}
                    aria-label={`Cancel ${signup.shift.title}`}
                    className="text-sm text-red-500 font-medium hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
