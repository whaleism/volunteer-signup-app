import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const fakeShiftDetail = {
  id: 1,
  title: "Food Drive - Morning Shift",
  date: "2026-07-10",
  time: "09:00",
  slots_available: 5,
  signups: [
    {
      signupId: 101,
      volunteer: {
        name: "Elena Vance",
        email: "elena.vance@email.com",
        phone: "773-555-1234",
      },
    },
    {
      signupId: 102,
      volunteer: {
        name: "Julian Beck",
        email: "julian@email.com",
        phone: "773-555-5678",
      },
    },
  ],
};

export default function ShiftDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [signups, setSignups] = useState(fakeShiftDetail.signups);

  function handleRemove(signupId) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this shift?",
    );

    if (confirmed) {
      setSignups(signups.filter((signup) => signup.signupId !== signupId));
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f7f4]">
      {/* Page title - spans full width */}
      <div className="max-w-5xl mx-auto px-8 pt-12 pb-4">
        <h1 className="text-3xl font-bold text-[#1a2e28]">Shift Details</h1>
      </div>

      {/* Two column layout below title */}
      <div className="flex max-w-5xl mx-auto px-8 gap-6">
        {/* Left Panel - Shift Details */}
        <div className="w-1/3">
          {/* Profile details */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-[#1a2e28] mb-2">
              {fakeShiftDetail.title}
            </h2>
            <p className="text-lg font-bold text-[#1a2e28] mb-3">
              {fakeShiftDetail.date} · {fakeShiftDetail.time}
            </p>
            <p className="text-sm text-[#6b8f84] mb-1">
              {signups.length} of {fakeShiftDetail.slots_available} filled
            </p>
          </div>
        </div>
        {/* Right panel - My Shifts */}
        <div className="w-2/3">
          <h2 className="text-xl font-bold text-[#1a2e28] mb-2">
            Volunteers Signed Up
          </h2>
          <div role="list">
            {signups.map((signup) => (
              <div
                key={signup.signupId}
                role="listitem"
                className="bg-white rounded-xl shadow-md p-4 mb-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-[#1a2e28]">
                    {signup.volunteer.name}
                  </p>
                  <p className="text-sm text-[#6b8f84]">
                    {signup.volunteer.email}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(signup.signupId)}
                  aria-label={`Remove ${signup.volunteer.name}`}
                  className="text-sm text-red-500 font-medium hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="text-sm text-[#2d8c6e] font-semibold hover:underline"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
