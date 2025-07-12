import React from "react";
import useAuth from "../../hooks/useAuth";

const MyProfileModerator = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="text-center mt-20">Loading user info...</div>;
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

      {/* Show role only if NOT 'user' */}
      {user.role && user.role !== "user" && (
        <p className="mt-2 inline-block bg-secondary text-white text-sm font-medium px-4 py-1 rounded-full">
          {user.role.toUpperCase()}
        </p>
      )}

      {/* Optional: show when account was created, etc. */}
    </div>
  );
};

export default MyProfileModerator;
