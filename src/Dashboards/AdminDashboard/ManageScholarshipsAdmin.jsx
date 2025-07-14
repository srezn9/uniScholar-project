import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import ScholarshipDetailsModalAdmin from "./ScholarshipDetailsModalAdmin";
import EditScholarshipModalAdmin from "./EditScholarshipModalAdmin";
// import EditScholarshipModal from "./EditScholarshipModal";
// import ScholarshipDetailsModal from "./ScholarshipDetailsModal";

// Fetch all scholarships
const fetchScholarships = async () => {
  const res = await axios.get(
    "https://unischolar-server.vercel.app/scholarships"
  );
  return res.data;
};

const ManageScholarshipsAdmin = () => {
  const [editScholarship, setEditScholarship] = useState(null);
  const [detailScholarship, setDetailScholarship] = useState(null);

  const {
    data: scholarships = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["adminScholarships"],
    queryFn: fetchScholarships,
  });

  // Delete handler
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This scholarship will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(
          `https://unischolar-server.vercel.app/scholarships/${id}`
        );
        Swal.fire("Deleted!", "Scholarship has been deleted.", "success");
        refetch();
      } catch {
        Swal.fire("Error!", "Failed to delete scholarship.", "error");
      }
    }
  };

  if (isLoading) return <p className="p-4">Loading scholarships...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-primary">
        Manage Scholarships (Admin)
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>Scholarship</th>
              <th>University</th>
              <th>Category</th>
              <th>Degree</th>
              <th>Fees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((sch) => (
              <tr key={sch._id}>
                <td>{sch.scholarshipName}</td>
                <td>{sch.universityName}</td>
                <td>{sch.scholarshipCategory}</td>
                <td>{sch.degree}</td>
                <td>${sch.applicationFees}</td>
                <td className="space-x-2 text-lg">
                  <button
                    onClick={() => setDetailScholarship(sch)}
                    title="Details"
                  >
                    <FaEye className="text-blue-600" />
                  </button>
                  <button onClick={() => setEditScholarship(sch)} title="Edit">
                    <FaEdit className="text-green-600" />
                  </button>
                  <button onClick={() => handleDelete(sch._id)} title="Delete">
                    <FaTrash className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {detailScholarship && (
        <ScholarshipDetailsModalAdmin
          scholarship={detailScholarship}
          onClose={() => setDetailScholarship(null)}
        />
      )}

      {/* Edit Modal */}
      {editScholarship && (
        <EditScholarshipModalAdmin
          scholarship={editScholarship}
          onClose={() => setEditScholarship(null)}
          onUpdate={() => {
            Swal.fire(
              "Updated!",
              "Scholarship updated successfully!",
              "success"
            );
            refetch();
            setEditScholarship(null);
          }}
        />
      )}
    </div>
  );
};

export default ManageScholarshipsAdmin;
