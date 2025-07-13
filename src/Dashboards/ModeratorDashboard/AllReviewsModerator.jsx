

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const AllReviewsModerator = () => {
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axios.get("https://unischolar-server.vercel.app/all-reviews");
      return res.data;
    },
  });

  const handleDelete = async (review) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      if (review.from === "collection") {
        const res = await axios.delete(
          `https://unischolar-server.vercel.app/reviews/${review._id}`
        );
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Review has been deleted.", "success");
          refetch();
        }
      } else if (review.from === "embedded") {
        const scholarshipId = review._id.split("_")[0]; // extract real ObjectId
        const res = await axios.delete(
          `https://unischolar-server.vercel.app/embedded-reviews/${scholarshipId}`,
          {
            data: {
              reviewerName: review.reviewerName,
              reviewDate: review.reviewDate,
            },
          }
        );

        if (res.data.message === "Embedded review deleted successfully") {
          Swal.fire("Deleted!", "Embedded review deleted.", "success");
          refetch();
        } else {
          Swal.fire(
            "Not found",
            res.data.message || "Could not delete",
            "info"
          );
        }
      }
    } catch (error) {
      console.error("Delete failed:", error);
      Swal.fire("Error", "Failed to delete review", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">All Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2"
          >
            <div className="flex items-center gap-4">
              <img
                src={review.reviewerImage}
                alt="reviewer"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold">{review.reviewerName}</h3>
                <p className="text-sm text-gray-500">{review.reviewDate}</p>
              </div>
            </div>

            <p>
              <span className="font-semibold">University:</span>{" "}
              {review.universityName}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {review.scholarshipCategory}
            </p>
            <p>
              <span className="font-semibold">Rating:</span>{" "}
              {review.ratingPoint} / 5
            </p>
            <p className="text-gray-700">{review.comments}</p>

            <button
              onClick={() => handleDelete(review)}
              className="mt-auto bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-xl"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviewsModerator;
