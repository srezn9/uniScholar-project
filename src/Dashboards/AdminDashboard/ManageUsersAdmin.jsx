import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
  const res = await axios.get("https://unischolar-server.vercel.app/users");
  return res.data;
};

const ManageUsersAdmin = () => {
  const [filterRole, setFilterRole] = useState("all");

  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: fetchUsers,
  });

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await axios.patch(
        `https://unischolar-server.vercel.app/users/role/${userId}`,
        { role: newRole }
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "User role updated.", "success");
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update role.", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "User will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`https://unischolar-server.vercel.app/users/${id}`);
        refetch();
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch {
        Swal.fire("Error!", "Failed to delete user.", "error");
      }
    }
  };

  const filteredUsers =
    filterRole === "all"
      ? users
      : users.filter((user) => user.role === filterRole);

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load users.</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Users</h2>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="select select-bordered"
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="select select-sm"
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <p className="text-center py-6">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageUsersAdmin;
