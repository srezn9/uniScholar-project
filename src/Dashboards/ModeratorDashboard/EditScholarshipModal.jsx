import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const EditScholarshipModal = ({ scholarship, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...scholarship });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: pick only the fields you allow to update
    const updatedFields = {
      scholarshipName: formData.scholarshipName,
      universityName: formData.universityName,
      scholarshipCategory: formData.scholarshipCategory,
      degree: formData.degree,
      applicationFees: Number(formData.applicationFees),
    };
    // console.log("Sending update to backend:", updatedFields);

    try {
      const res = await axios.patch(
        `https://unischolar-server.vercel.app/scholarships/${scholarship._id}`,
        updatedFields
      );
      if (res.data.modifiedCount > 0 || res.status === 200) {
        Swal.fire("Success!", "Scholarship updated successfully.", "success");
        onUpdate({ ...formData, _id: scholarship._id });
        onClose();
      }
    } catch {
      Swal.fire("Error!", "Update failed!", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg relative">
        <h2 className="text-xl font-bold mb-4">Edit Scholarship</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="scholarshipName"
            value={formData.scholarshipName}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Scholarship Name"
          />
          <input
            name="universityName"
            value={formData.universityName}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="University Name"
          />
          <input
            name="scholarshipCategory"
            value={formData.scholarshipCategory}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Category"
          />
          <input
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Degree"
          />
          <input
            name="applicationFees"
            value={formData.applicationFees}
            onChange={handleChange}
            type="number"
            className="input input-bordered w-full"
            placeholder="Application Fees"
          />
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="btn">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditScholarshipModal;
