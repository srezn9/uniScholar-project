import { NavLink, Outlet } from "react-router";
import Logo from "../../Logo/Logo";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-accent/10 to-white">
      <div className="flex flex-col md:flex-row flex-1">
        
        <aside className="w-full md:w-64 bg-gradient-to-b from-primary to-secondary text-white p-5 md:p-6 shadow-lg">
          <div className="mb-4">
            <Logo />
          </div>
          <h2 className="text-2xl font-extrabold mb-6 tracking-wide text-white drop-shadow">
            Admin Panel
          </h2>

          <nav className="flex md:flex-col gap-3">
            <NavLink
              to="/adminDashboard"
              end
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-primary font-semibold px-4 py-2 rounded-xl shadow"
                  : "hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
              }
            >
              Admin Profile
            </NavLink>

            <NavLink
              to="/adminDashboard/add-scholarship-admin"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-primary font-semibold px-4 py-2 rounded-xl shadow"
                  : "hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
              }
            >
              Add Scholarship
            </NavLink>

            <NavLink
              to="/adminDashboard/manage-scholarships-admin"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-primary font-semibold px-4 py-2 rounded-xl shadow"
                  : "hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
              }
            >
              Manage Scholarships
            </NavLink>

            <NavLink
              to="/adminDashboard/manage-applications-admin"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-primary font-semibold px-4 py-2 rounded-xl shadow"
                  : "hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
              }
            >
              Manage Applications
            </NavLink>

            <NavLink
              to="/adminDashboard/manage-users-admin"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-primary font-semibold px-4 py-2 rounded-xl shadow"
                  : "hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
              }
            >
              Manage Users
            </NavLink>

            <NavLink
              to="/adminDashboard/manage-reviews-admin"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-primary font-semibold px-4 py-2 rounded-xl shadow"
                  : "hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
              }
            >
              Manage Reviews
            </NavLink>
            <NavLink
              to="/adminDashboard/analytics"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-primary font-semibold px-4 py-2 rounded-xl shadow"
                  : "hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
              }
            >
              Analytics
            </NavLink>
          </nav>
        </aside>

        
        <main className="flex-1 p-4 md:p-8 bg-gradient-to-tr from-white to-primary/10">
          <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
