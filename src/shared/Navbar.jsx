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
              ? "underline text-secondary font-semibold"
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
              ? "underline text-secondary font-semibold"
              : "font-semibold"
          }
        >
          All Scholarships
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to="/userDashboard"
            className={({ isActive }) =>
              isActive
                ? "underline text-secondary font-semibold"
                : "font-semibold"
            }
          >
            User Dashboard
          </NavLink>
        </li>
      )}

      {(userRole === "moderator" || userRole === "admin") && (
        <li>
          <NavLink
            to="/moderatorDashboard"
            className={({ isActive }) =>
              isActive
                ? "underline text-secondary font-semibold"
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
                ? "underline text-secondary font-semibold"
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
          className="font-semibold hover:underline text-secondary cursor-pointer"
        >
          FAQ
        </a>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
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
        <h2 className="text-xl font-bold text-primary">
          <span className="inline-block -rotate-[10deg]">Uni</span>
          <span className="text-secondary">Scholar</span>
        </h2>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end hidden lg:flex items-center gap-4">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  title={user.displayName || "User"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="text-center font-semibold">{user.displayName}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn bg-secondary text-white w-full"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn bg-secondary text-white">
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-2xl btn bg-secondary text-white"
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
