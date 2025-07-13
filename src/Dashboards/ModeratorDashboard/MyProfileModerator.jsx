import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Loader from "../../shared/Loader";

const MyProfileModerator = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://unischolar-server.vercel.app/users/role/${user.email}`)
        .then((res) => setRole(res.data.role))
        .catch(() => setRole("user")); // fallback
    }
  }, [user]);

  if (!user) {
    return <Loader></Loader>;
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow-xl rounded-xl p-6 text-center">
      <img
        src={user.photoURL || "https://i.ibb.co/r6L6ZPZ/default-avatar.png"}
        alt="Profile"
        className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-secondary object-cover"
      />
      <h2 className="text-2xl font-semibold text-primary">
        {user.displayName || "Anonymous"}
      </h2>
      <p className="text-gray-600">{user.email}</p>

      {/* Show role if not 'user' */}
      {role && role !== "user" && (
        <p className="mt-2 inline-block bg-secondary text-white text-sm font-medium px-4 py-1 rounded-full">
          {role.toUpperCase()}
        </p>
      )}
    </div>
  );
};

export default MyProfileModerator;
