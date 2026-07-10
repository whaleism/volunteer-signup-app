import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, role } = useAuth();

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-[#1a2e28] flex flex-col px-6 py-8 hidden md:flex">
      {/* Org name*/}
      <h1 className="text-white font-bold text-xl mb-10">Volunteer Hub</h1>
      {/* Nav links*/}
      {/* Always visible */}
      <Link to="/" className="text-white/80 hover:text-white py-2">
        Browse Shifts
      </Link>

      {/* Logged out */}
      {!user && (
        <>
          <Link to="/login" className="text-white/80 hover:text-white py-2">
            Login
          </Link>
          <Link to="/signup" className="text-white/80 hover:text-white py-2">
            Sign Up
          </Link>
        </>
      )}

      {/* Volunteer */}
      {user && role === "volunteer" && (
        <Link to="/my-shifts" className="text-white/80 hover:text-white py-2">
          My Shifts
        </Link>
      )}

      {/* Admin */}
      {user && role === "admin" && (
        <Link to="/admin" className="text-white/80 hover:text-white py-2">
          Admin Dashboard
        </Link>
      )}

      {/* Logout - for logged in users only */}
      {user && (
        <button className="text-white/80 hover:text-white py-2 text-left mt-auto">
          Logout
        </button>
      )}
    </div>
  );
}
