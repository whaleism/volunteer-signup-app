import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (email.trim() === "") {
      newErrors.email = "Email";
    }
    if (password.trim() === "") {
      newErrors.password = "Password";
    }

    setErrors(newErrors);
    console.log(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form is valid:", { email, password });
    }
  }

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-[#1a2e28] to-[#2d8c6e] flex items-center justify-center">
      {/* Centered blurred card */}
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-white/80 mb-6">
          Login to start volunteering and make a difference.
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
              htmlFor="email"
              className="block text-sm font-medium text-white/90 mb-1"
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
              className="block text-sm font-medium text-white/90 mb-1"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d8c6e]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a2e28]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-sm text-white/80 mt-2 text-right">
              <a href="/" className="hover:text-white">
                Forgot password?
              </a>
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-[#2d8c6e] text-white py-2 rounded-lg font-medium hover:bg-[#256f58] transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-white text-center mt-4">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-white font-semibold underline decoration-white/50 hover:decoration-white transition"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
