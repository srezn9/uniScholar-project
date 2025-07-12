import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import EditScholarshipModal from "./EditScholarshipModal";

const fetchScholarships = async () => {
  const res = await axios.get("http://localhost:5000/scholarships");
  return res.data;
};

const ManageScholarshipModerator = () => {
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const {
    data: scholarships = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["scholarships"],
    queryFn: fetchScholarships,
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This scholarship will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/scholarships/${id}`);
        refetch();
        Swal.fire("Deleted!", "Scholarship has been deleted.", "success");
      } catch {
        Swal.fire("Error!", "Failed to delete.", "error");
      }
    }
  };

  if (isLoading) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Scholarships</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>Name</th>
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
                    onClick={() => setSelectedScholarship(sch)}
                    title="Details"
                  >
                    <FaEye className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => setSelectedScholarship(sch)}
                    title="Edit"
                  >
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

      {/* Show modal for Edit or Details */}
      {selectedScholarship && (
        <EditScholarshipModal
          scholarship={selectedScholarship}
          onClose={() => setSelectedScholarship(null)}
          onUpdate={(updated) => {
            Swal.fire(
              "Updated!",
              "Scholarship updated successfully!",
              "success"
            );
            refetch();
            setSelectedScholarship(null);
          }}
        />
      )}
    </div>
  );
};

export default ManageScholarshipModerator;
