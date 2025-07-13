import { NavLink, Outlet } from "react-router";
import Logo from "../../Logo/Logo";

const UserDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-accent/10 to-white">
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-gradient-to-b from-primary to-accent text-white p-5 md:p-6 shadow-lg">
          <div className="mb-4">
            <Logo />
          </div>
          <h2 className="text-2xl font-extrabold mb-6 tracking-wide text-white drop-shadow">
            User Dashboard
          </h2>

          <nav className="flex md:flex-col gap-3">
            <NavLink
              to="/userDashboard"
              end
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-primary font-semibold px-4 py-2 rounded-xl shadow"
                  : "hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
              }
            >
              My Profile
            </NavLink>

            <NavLink
              to="/userDashboard/applications"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-primary font-semibold px-4 py-2 rounded-xl shadow"
                  : "hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
              }
            >
              My Applications
            </NavLink>

            <NavLink
              to="/userDashboard/reviews"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-primary font-semibold px-4 py-2 rounded-xl shadow"
                  : "hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
              }
            >
              My Reviews
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 bg-gradient-to-tr from-white to-secondary/40">
          <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
