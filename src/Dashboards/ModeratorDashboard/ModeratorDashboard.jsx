import { NavLink, Outlet } from "react-router";
import Logo from "../../Logo/Logo";


const ModeratorDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-accent/10 to-white">
      {/* Top Navbar */}
      <header className="w-full bg-white shadow p-4 md:px-8 flex justify-between items-center">
        <Logo />
        <span className="text-sm text-gray-500 hidden md:inline">
          Moderator Dashboard
        </span>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-gradient-to-b from-secondary to-primary text-white p-5 md:p-6 shadow-lg">
          <h2 className="text-2xl font-extrabold mb-6 tracking-wide text-white drop-shadow">
            Moderator Panel
          </h2>

          <nav className="flex md:flex-col gap-3">
            <NavLink
              to="/moderatorDashboard"
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
              to="/moderatorDashboard/manage-scholarships"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-primary font-semibold px-4 py-2 rounded-xl shadow"
                  : "hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
              }
            >
              Manage Scholarships
            </NavLink>

            <NavLink
              to="/moderatorDashboard/all-reviews"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-primary font-semibold px-4 py-2 rounded-xl shadow"
                  : "hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
              }
            >
              All Reviews
            </NavLink>

            <NavLink
              to="/moderatorDashboard/all-applications"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-primary font-semibold px-4 py-2 rounded-xl shadow"
                  : "hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
              }
            >
              All Applications
            </NavLink>

            <NavLink
              to="/moderatorDashboard/add-scholarship"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-primary font-semibold px-4 py-2 rounded-xl shadow"
                  : "hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
              }
            >
              Add Scholarship
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

export default ModeratorDashboard;
