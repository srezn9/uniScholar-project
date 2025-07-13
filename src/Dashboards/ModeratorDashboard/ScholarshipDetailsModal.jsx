import React from "react";
import { FaTimes } from "react-icons/fa";

const ScholarshipDetailsModal = ({ scholarship, onClose }) => {
  if (!scholarship) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-[600px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 text-xl"
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-bold mb-4">
          {scholarship.scholarshipName}
        </h2>
        <p>
          <strong>University:</strong> {scholarship.universityName}
        </p>
        <p>
          <strong>Category:</strong> {scholarship.scholarshipCategory}
        </p>
        <p>
          <strong>Degree:</strong> {scholarship.degree}
        </p>
        <p>
          <strong>Fees:</strong> ${scholarship.applicationFees}
        </p>
        <p>
          <strong>Service Charge:</strong> {scholarship.serviceCharge}
        </p>
        <p>
          <strong>Post Date:</strong> {scholarship.postDate}
        </p>
      </div>
    </div>
  );
};

export default ScholarshipDetailsModal;
