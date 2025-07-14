import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Loader from "../../shared/Loader";

const AdminProfile = () => {
  const { user } = useAuth();

  // Fetch role using TanStack Query
  const {
    data: role,
    isLoading,
    isError,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `https://unischolar-server.vercel.app/users/role/${user.email}`
      );
      return res.data.role || "user";
    },
  });

  if (!user || isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-red-500 text-center">Failed to load profile role.</p>
    );

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow-xl rounded-xl p-6 text-center">
      <img
        src={user.photoURL || "https://i.ibb.co/r6L6ZPZ/default-avatar.png"}
        alt="Admin Profile"
        className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-primary object-cover"
      />
      <h2 className="text-2xl font-semibold text-primary">
        {user.displayName || "Admin User"}
      </h2>
      <p className="text-gray-600">{user.email}</p>

      {role !== "user" && (
        <p className="mt-2 inline-block bg-primary text-white text-sm font-medium px-4 py-1 rounded-full">
          {role.toUpperCase()}
        </p>
      )}
    </div>
  );
};

export default AdminProfile;
