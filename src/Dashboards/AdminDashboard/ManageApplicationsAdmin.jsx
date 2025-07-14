import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../shared/Loader";

// Fetch function
const fetchAllApplications = async () => {
  const res = await axios.get(
    "https://unischolar-server.vercel.app/applied-scholarships/all"
  );
  return res.data;
};

const ManageApplicationsAdmin = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackApp, setFeedbackApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  const {
    data: applications = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["allApplications"],
    queryFn: fetchAllApplications,
  });

  // Handle feedback submit
  const handleFeedbackSubmit = async () => {
    if (!feedbackText.trim()) return;

    try {
      const res = await axios.put(
        `https://unischolar-server.vercel.app/applied-scholarships/${feedbackApp._id}`,
        { feedback: feedbackText }
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Feedback submitted successfully", "success");
        setFeedbackApp(null);
        setFeedbackText("");
        refetch();
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // Cancel application
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://unischolar-server.vercel.app/applied-scholarships/${id}`
          )
          .then(() => {
            refetch();
            Swal.fire(
              "Canceled!",
              "The application has been canceled.",
              "success"
            );
          });
      }
    });
  };

  if (isLoading) return <Loader />;
  if (isError)
    return <div className="p-6 text-red-500">Failed to load applications</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-primary">
        Manage All Applications
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th>Email</th>
              <th>University</th>
              <th>Degree</th>
              <th>Category</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.userEmail}</td>
                <td>{app.universityName}</td>
                <td>{app.degree || "N/A"}</td>
                <td>{app.scholarshipCategory || "N/A"}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      app.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : app.status === "processing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="flex gap-2 justify-center">
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="btn btn-sm btn-info"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => setFeedbackApp(app)}
                    className="btn btn-sm btn-secondary"
                  >
                    Feedback
                  </button>
                  <button
                    onClick={() => handleCancel(app._id)}
                    className="btn btn-sm btn-error"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[500px] max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Application Details</h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Email:</strong> {selectedApp.userEmail}
              </p>
              <p>
                <strong>Phone:</strong> {selectedApp.phone}
              </p>
              <p>
                <strong>Gender:</strong> {selectedApp.gender}
              </p>
              <p>
                <strong>Address:</strong> {selectedApp.address}
              </p>
              <p>
                <strong>University:</strong> {selectedApp.universityName}
              </p>
              <p>
                <strong>Degree:</strong> {selectedApp.degree}
              </p>
              <p>
                <strong>Scholarship Category:</strong>{" "}
                {selectedApp.scholarshipCategory}
              </p>
              <p>
                <strong>Subject:</strong> {selectedApp.subjectName}
              </p>
              <p>
                <strong>SSC Result:</strong> {selectedApp.sscResult}
              </p>
              <p>
                <strong>HSC Result:</strong> {selectedApp.hscResult}
              </p>
              <p>
                <strong>Study Gap:</strong> {selectedApp.studyGap}
              </p>
              <p>
                <strong>Status:</strong> {selectedApp.status}
              </p>
              <p>
                <strong>Applied At:</strong>{" "}
                {new Date(selectedApp.appliedAt).toLocaleString()}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setSelectedApp(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[500px]">
            <h3 className="text-xl font-bold mb-4">Submit Feedback</h3>
            <p className="mb-2">
              <strong>For:</strong> {feedbackApp.userName} (
              {feedbackApp.userEmail})
            </p>
            <textarea
              className="w-full p-2 border rounded mb-4"
              rows="4"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Write your feedback here..."
            />
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => {
                  setFeedbackApp(null);
                  setFeedbackText("");
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleFeedbackSubmit}
                className="btn btn-sm btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplicationsAdmin;
