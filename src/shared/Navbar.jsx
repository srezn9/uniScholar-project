import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout, userRole } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          title: "Logged Out!",
          text: "You have been logged out successfully.",
          icon: "success",
          iconColor: "#14b8a6",
          background: "#f5f3ff",
          color: "#4c1d95",
          confirmButtonText: "Okay",
          confirmButtonColor: "#8b5cf6",
          customClass: {
            popup: "rounded-xl shadow-lg",
            confirmButton: "px-4 py-2 text-white font-semibold",
          },
          timer: 3000,
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Logout Failed",
          text: "Something went wrong while logging out.",
          icon: "error",
          iconColor: "#e11d48",
          background: "#fdf4ff",
          color: "#701a75",
          confirmButtonText: "Retry",
          confirmButtonColor: "#c084fc",
          customClass: {
            popup: "rounded-xl shadow-lg",
            confirmButton: "px-4 py-2 text-white font-semibold",
          },
        });
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "underline text-[#B25D5D] font-semibold"
              : "font-semibold"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allScholarship"
          className={({ isActive }) =>
            isActive
              ? "underline text-[#B25D5D] font-semibold"
              : "font-semibold"
          }
        >
          All Scholarships
        </NavLink>
      </li>

      {userRole === "user" && (
        <li>
          <NavLink
            to="/userDashboard"
            className={({ isActive }) =>
              isActive
                ? "underline text-[#B25D5D] font-semibold"
                : "font-semibold"
            }
          >
            User Dashboard
          </NavLink>
        </li>
      )}

      {userRole === "moderator" && (
        <li>
          <NavLink
            to="/moderatorDashboard"
            className={({ isActive }) =>
              isActive
                ? "underline text-[#B25D5D] font-semibold"
                : "font-semibold"
            }
          >
            Moderator Dashboard
          </NavLink>
        </li>
      )}

      {userRole === "admin" && (
        <li>
          <NavLink
            to="/adminDashboard"
            className={({ isActive }) =>
              isActive
                ? "underline text-[#B25D5D] font-semibold"
                : "font-semibold"
            }
          >
            Admin Dashboard
          </NavLink>
        </li>
      )}

      {/* anchor for scroll */}
      <li>
        <a
          href="#faq"
          className="font-semibold hover:underline text-[#B25D5D] cursor-pointer"
        >
          FAQ
        </a>
      </li>
    </>
  );

  return (
    <div className="navbar fixed top-0 left-0 z-50 w-full shadow-sm bg-gradient-to-r from-[#A3B18A] to-[#B25D5D]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
            {!user && (
              <>
                <li>
                  <Link to="/login" className="btn bg-violet-800 text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="btn bg-violet-700 text-white">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <h2 className="text-xl font-bold text-[#2D2A32]">
          <span className="inline-block -rotate-[10deg]">Uni</span>
          <span className="text-[#B25D5D]">Scholar</span>
        </h2>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end hidden lg:flex items-center gap-4">
        {/* Theme Toggle */}
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" className="theme-controller" value="dark" />

          {/* sun icon */}
          <svg
            className="swap-off fill-current w-6 h-6 text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64 17.657l1.414-1.414a8 8 0 0011.314-11.314l1.414-1.414A10 10 0 015.64 17.657z"></path>
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on fill-current w-6 h-6 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64 13a9 9 0 01-8.64 6 9 9 0 010-18 9 9 0 018.64 6z"></path>
          </svg>
        </label>

        {/* User/Auth */}
        {user ? (
          <div className="flex items-center gap-4">
            <img
              src={user.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full "
            />
            <span className="font-semibold text-sm">
              {user.displayName || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-sm bg-[#B25D5D] text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn bg-[#B25D5D] text-white">
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-2xl btn bg-[#B25D5D] text-white"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
