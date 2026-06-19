import { useState } from "react";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (fullName.trim() === "") {
      newErrors.fullName = "Full name";
    }
    if (email.trim() === "") {
      newErrors.email = "Email";
    }
    if (password.trim() === "") {
      newErrors.password = "Password";
    }
    if (phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone Number";
    }

    setErrors(newErrors);
    console.log(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form is valid:", { fullName, email, password, phoneNumber });
    }
  }

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="hidden md:flex items-center justify-center h-full w-1/2 bg-gradient-to-br from-[#1a2e28] to-[#2d8c6e]">
        <h1 className="text-3xl font-bold text-white">
          Non-profit Organization
        </h1>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 px-12 py-12 overflow-y-auto">
        <h1 className="text-3xl font-bold text-[#1a2e28] mb-2">
          Create an account
        </h1>
        <p className="text-[#6b8f84] mb-6">
          Sign up to start volunteering and make a difference.
        </p>
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
              htmlFor="fullName"
              className="block text-sm font-medium text-[#1a2e28] mb-1"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Smith"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d8c6e]"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#1a2e28] mb-1"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d8c6e]"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#1a2e28] mb-1"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d8c6e]"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-[#1a2e28] mb-1"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="123-456-7890"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d8c6e]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#2d8c6e] text-white py-2 rounded-lg font-medium hover:bg-[#256f58] transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-[#6b8f84] text-center mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#2d8c6e] font-medium hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
