import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import ScholarshipDetailsModalAdmin from "./ScholarshipDetailsModalAdmin";
import EditScholarshipModalAdmin from "./EditScholarshipModalAdmin";
import Loader from "../../shared/Loader";

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

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-primary">
        Manage Scholarships (Admin)
      </h2>

      <div className="overflow-x-auto w-full">
        <table className="min-w-[700px] w-full border border-gray-300">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="p-2 md:p-3 text-left text-sm md:text-base">
                Scholarship
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base">
                University
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base">
                Category
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base">
                Degree
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base">
                Fees
              </th>
              <th className="p-2 md:p-3 text-center text-sm md:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((sch) => (
              <tr
                key={sch._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="p-2 md:p-3 text-sm md:text-base">
                  {sch.scholarshipName}
                </td>
                <td className="p-2 md:p-3 text-sm md:text-base">
                  {sch.universityName}
                </td>
                <td className="p-2 md:p-3 text-sm md:text-base">
                  {sch.scholarshipCategory}
                </td>
                <td className="p-2 md:p-3 text-sm md:text-base">
                  {sch.degree}
                </td>
                <td className="p-2 md:p-3 text-sm md:text-base">
                  ${sch.applicationFees}
                </td>
                <td className="p-2 md:p-3 text-center text-sm md:text-base space-x-3">
                  <button
                    onClick={() => setDetailScholarship(sch)}
                    title="Details"
                    className="inline-block hover:text-blue-700"
                  >
                    <FaEye className="text-blue-600 w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={() => setEditScholarship(sch)}
                    title="Edit"
                    className="inline-block hover:text-green-700"
                  >
                    <FaEdit className="text-green-600 w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(sch._id)}
                    title="Delete"
                    className="inline-block hover:text-red-700"
                  >
                    <FaTrash className="text-red-600 w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {detailScholarship && (
        <ScholarshipDetailsModalAdmin
          scholarship={detailScholarship}
          onClose={() => setDetailScholarship(null)}
        />
      )}

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
