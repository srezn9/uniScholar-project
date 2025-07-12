import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AllReviewsModerator = () => {
  const [localReviews, setLocalReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        // 1. Fetch all scholarships
        const scholarshipsRes = await axios.get(
          "http://localhost:5000/scholarships"
        );
        const scholarships = scholarshipsRes.data;

        // Extract embedded reviews from scholarships and normalize fields
        const embeddedReviews = scholarships.flatMap((sch) => {
          return (sch.reviews || []).map((r, idx) => ({
            _id: `${sch._id}-${idx}`, // fake unique id
            userImage: r.reviewerImage || "/default-avatar.png",
            userName: r.reviewerName || "Anonymous",
            date: r.reviewDate || "Unknown",
            rating: r.ratingPoint || 0,
            comment: r.comments || "",
            scholarshipName: sch.scholarshipName || "Unknown",
            universityName: sch.universityName || "Unknown",
            from: "scholarshipEmbedded",
          }));
        });

        // 2. Fetch all reviews collection (user reviews)
        const reviewsRes = await axios.get("http://localhost:5000/all-reviews");
        const userReviews = reviewsRes.data.map((r) => ({
          _id: r._id,
          userImage: r.userImage || "/default-avatar.png",
          userName: r.userName || "Anonymous",
          date: r.date || "Unknown",
          rating: r.rating || 0,
          comment: r.comment || "",
          scholarshipName: r.scholarshipName || "Unknown",
          universityName: r.universityName || "Unknown",
          from: "userSubmitted",
        }));

        // 3. Combine both arrays
        const combinedReviews = [...embeddedReviews, ...userReviews];

        setLocalReviews(combinedReviews);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load reviews:", error);
        setIsError(true);
        setIsLoading(false);
      }
    }

    fetchReviews();
  }, []);

  const handleDelete = (id) => {
    // Only allow deleting user submitted reviews
    const review = localReviews.find((r) => r._id === id);
    if (!review || review.from === "scholarshipEmbedded") {
      Swal.fire("Cannot delete embedded scholarship reviews");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/reviews/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Review has been deleted.", "success");
            setLocalReviews((prev) => prev.filter((r) => r._id !== id));
          })
          .catch(() => Swal.fire("Error", "Failed to delete review", "error"));
      }
    });
  };

  if (isLoading) return <p className="text-center">Loading reviews...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load reviews.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">All Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localReviews.map((review) => (
          <div
            key={review._id}
            className="border rounded-xl p-4 shadow-md space-y-2 bg-white"
          >
            <div className="flex items-center gap-3">
              <img
                src={review.userImage}
                alt="Reviewer"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold">{review.userName}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p>
              <strong>University:</strong> {review.universityName}
            </p>
            <p>
              <strong>Subject:</strong> {review.scholarshipName}
            </p>
            <p>
              <strong>Rating:</strong> {review.rating} / 5
            </p>
            <p>
              <strong>Comment:</strong> {review.comment}
            </p>
            {review.from === "userSubmitted" && (
              <button
                onClick={() => handleDelete(review._id)}
                className="px-3 py-1 mt-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            )}
            {review.from === "scholarshipEmbedded" && (
              <p className="text-xs text-gray-400 italic">
                Embedded scholarship review
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviewsModerator;
