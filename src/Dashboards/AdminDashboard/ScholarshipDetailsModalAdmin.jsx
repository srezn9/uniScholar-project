import React from "react";
import { FaTimes } from "react-icons/fa";

const ScholarshipDetailsModalAdmin = ({ scholarship, onClose }) => {
  if (!scholarship) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-[600px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 text-xl"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          {scholarship.scholarshipName}
        </h2>

        <div className="space-y-2 text-sm">
          <p>
            <strong>University:</strong> {scholarship.universityName}
          </p>
          <p>
            <strong>Category:</strong> {scholarship.scholarshipCategory}
          </p>
          <p>
            <strong>Subject:</strong> {scholarship.subjectName || "N/A"}
          </p>
          <p>
            <strong>Degree:</strong> {scholarship.degree}
          </p>
          <p>
            <strong>Application Fees:</strong> ${scholarship.applicationFees}
          </p>
          <p>
            <strong>Service Charge:</strong> ${scholarship.serviceCharge}
          </p>
          <p>
            <strong>Location:</strong> {scholarship.location?.city},{" "}
            {scholarship.location?.country}
          </p>
          <p>
            <strong>Application Deadline:</strong>{" "}
            {scholarship.applicationDeadline}
          </p>
          <p>
            <strong>Post Date:</strong> {scholarship.postDate}
          </p>
          <p>
            <strong>Posted By:</strong> {scholarship.postedBy}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetailsModalAdmin;
