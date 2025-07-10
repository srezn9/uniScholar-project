import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";

const MyApplications = () => {
  const { user } = useAuth();

  const [selectedApp, setSelectedApp] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: applications = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/user-applications/${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleEdit = (app) => {
    if (app.status !== "pending") {
      Swal.fire({
        icon: "warning",
        title: "Edit Not Allowed",
        text: `This application is already ${app.status}. You can only edit applications that are pending.`,
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    console.log("Navigating to edit page...", app._id);
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to cancel this application.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `http://localhost:5000/applied-scholarships/${id}`
          );
          if (res.data.deletedCount > 0) {
            Swal.fire({
              icon: "success",
              title: "Cancelled!",
              text: "Application has been cancelled.",
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Could not cancel the application. Please try again.",
          });
        }
      }
    });
  };

  const handleAddReview = (app) => {
    setSelectedApp(app);
  };

  const onSubmitReview = async (data) => {
    const review = {
      rating: parseInt(data.rating),
      comment: data.comment,
      date: data.date,
      scholarshipName: selectedApp.scholarshipName,
      universityName: selectedApp.universityName,
      universityId: selectedApp.universityId,
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL || null,
    };

    try {
      const res = await axios.post(`http://localhost:5000/reviews`, review);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Review Submitted!",
          text: "Thanks for your feedback.",
        });
        reset();
        setSelectedApp(null);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Could not submit review.",
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-primary">My Applications</h2>
      <table className="table w-full bg-white shadow-lg rounded-lg">
        <thead className="bg-accent text-white">
          <tr>
            <th>#</th>
            <th>University</th>
            <th>Address</th>
            <th>Feedback</th>
            <th>Category</th>
            <th>Degree</th>
            <th>App Fee</th>
            <th>Service</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={app._id}>
              <td>{index + 1}</td>
              <td>{app.universityName}</td>
              <td>{app.address || "—"}</td>
              <td>{app.feedback || "—"}</td>
              <td>{app.subjectName}</td>
              <td>{app.degree}</td>
              <td>${app.applicationFees}</td>
              <td>${app.serviceCharge}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    app.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : app.status === "processing"
                      ? "bg-blue-200 text-blue-800"
                      : app.status === "completed"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {app.status}
                </span>
              </td>
              <td className="flex flex-row gap-2 justify-center">
                <button className="px-3 py-1 rounded-md text-xs font-medium bg-primary hover:bg-black text-white transition-colors duration-200 ease-in-out">
                  Details
                </button>
                <button
                  onClick={() => handleEdit(app)}
                  className="px-3 py-1 rounded-md text-xs font-medium border border-blue-400 text-blue-600 hover:bg-blue-100 transition-colors duration-200 ease-in-out"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCancel(app._id)}
                  className="px-3 py-1 rounded-md text-xs font-medium border border-red-500 text-red-600 hover:bg-red-100 transition-colors duration-200 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAddReview(app)}
                  className="px-3 py-1 rounded-md text-xs font-medium border border-green-500 text-green-600 hover:bg-green-100 transition-colors duration-200 ease-in-out"
                >
                  Add Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedApp && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Add Review
            </h3>
            <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-4">
              <div>
                <label className="block mb-1">Rating (1 to 5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  {...register("rating", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block mb-1">Review Comment</label>
                <textarea
                  {...register("comment", { required: true })}
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>

              <div>
                <label className="block mb-1">Review Date</label>
                <input
                  type="date"
                  {...register("date", { required: true })}
                  className="input input-bordered w-full"
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-sm bg-gray-300 text-black"
                  onClick={() => setSelectedApp(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm bg-primary text-white"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
