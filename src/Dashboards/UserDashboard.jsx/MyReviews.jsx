import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Loader from "../../shared/Loader";

const MyReviews = () => {
  const { user } = useAuth();
  const [selectedReview, setSelectedReview] = useState(null);

  const {
    data: reviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["userReviews", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `https://unischolar-server.vercel.app/reviews?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://unischolar-server.vercel.app/reviews/${id}`);
          Swal.fire("Deleted!", "Your review has been deleted.", "success");
          refetch();
        } catch {
          Swal.fire("Error!", "Failed to delete the review.", "error");
        }
      }
    });
  };

  const onSubmitEdit = async (data) => {
    try {
      const updated = {
        rating: parseInt(data.rating),
        comment: data.comment,
        date: data.date,
      };
      const res = await axios.patch(
        `https://unischolar-server.vercel.app/reviews/${selectedReview._id}`,
        updated
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Review updated successfully.", "success");
        setSelectedReview(null);
        refetch();
      }
    } catch {
      Swal.fire("Error!", "Failed to update the review.", "error");
    }
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-primary">My Reviews</h2>
      <table className="table w-full bg-white shadow-lg rounded-lg">
        <thead className="bg-accent text-white">
          <tr>
            <th>#</th>
            <th>Scholarship</th>
            <th>University</th>
            <th>Comment</th>
            <th>Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((rev, idx) => (
            <tr key={rev._id}>
              <td>{idx + 1}</td>
              <td>{rev.scholarshipName}</td>
              <td>{rev.universityName}</td>
              <td>{rev.comment}</td>
              <td>{rev.date?.split("T")[0]}</td>
              <td className="flex gap-2 justify-center">
                <button
                  onClick={() => setSelectedReview(rev)}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(rev._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {selectedReview && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Edit Review
            </h3>
            <form onSubmit={handleSubmit(onSubmitEdit)} className="space-y-4">
              <div>
                <label className="block mb-1">Rating (1 to 5)</label>
                <input
                  type="number"
                  step="1"
                  defaultValue={selectedReview.rating}
                  {...register("rating", {
                    required: true,
                    min: 1,
                    max: 5,
                  })}
                  className="input input-bordered w-full"
                />
                {errors.rating && (
                  <p className="text-red-500 text-sm">Rating must be 1 to 5</p>
                )}
              </div>
              <div>
                <label className="block mb-1">Review Comment</label>
                <textarea
                  defaultValue={selectedReview.comment}
                  {...register("comment", { required: true })}
                  className="textarea textarea-bordered w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Review Date</label>
                <input
                  type="date"
                  defaultValue={selectedReview.date?.split("T")[0]}
                  {...register("date", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedReview(null)}
                  className="btn btn-sm bg-gray-300 text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm bg-primary text-white"
                >
                  Update Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
