import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ReviewCard from "../components/ReviewCard";

// Fetch single scholarship by ID
const fetchScholarshipById = async (id) => {
  const res = await axios.get(`http://localhost:5000/scholarships/${id}`);
  return res.data;
};

// Calculate average rating
const calculateAverageRating = (reviews = []) => {
  if (!reviews || reviews.length === 0) return "No reviews yet";
  const total = reviews.reduce((sum, r) => sum + r.ratingPoint, 0);
  return (total / reviews.length).toFixed(1);
};

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: () => fetchScholarshipById(id),
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  if (isError)
    return (
      <div className="text-center py-10 text-red-600 font-semibold">
        Error: {error.message || "Failed to fetch data"}
      </div>
    );

  const {
    universityName,
    universityLogo,
    scholarshipCategory,
    subjectName,
    applicationDeadline,
    applicationFees,
    stipend,
    serviceCharge,
    postDate,
    location,
    scholarshipDescription,
    reviews,
  } = data;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      {/* University Info */}
      <h2 className="text-2xl font-bold mb-4">{universityName}</h2>
      <img
        src={universityLogo}
        alt={universityName}
        className="h-60 object-cover mb-4 w-full rounded"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
        <p>
          <strong>Location:</strong> {location?.city}, {location?.country}
        </p>
        <p>
          <strong>Scholarship Category:</strong> {scholarshipCategory}
        </p>
        <p>
          <strong>Subject:</strong> {subjectName}
        </p>
        <p>
          <strong>Deadline:</strong> {applicationDeadline}
        </p>
        <p>
          <strong>Application Fee:</strong> ${applicationFees}
        </p>
        {stipend && (
          <p>
            <strong>Stipend:</strong> ${stipend} / month
          </p>
        )}
        <p>
          <strong>Post Date:</strong> {postDate}
        </p>
        <p>
          <strong>Service Charge:</strong> ${serviceCharge}
        </p>
        <p className="flex items-center gap-1">
          <strong>Rating:</strong>
          <AiFillStar className="text-yellow-500" />
          {calculateAverageRating(reviews)}
        </p>
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-700">{scholarshipDescription}</p>

      {/* Apply Button */}

      <button
        onClick={() => navigate(`/checkout/${id}`)} // navigate to checkout page for this scholarship
        className="mt-5 btn btn-secondary w-full"
      >
        Apply for Scholarship
      </button>

      {/* Reviews */}
      <div className="mt-10">
        <h3 className="mb-4 text-2xl font-semibold">
          User Reviews ({reviews?.length || 0})
        </h3>

        {reviews && reviews.length > 0 ? (
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              autoplay={{ delay: 3500 }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1} // ✅ Always show one slide
            >
              {reviews.map((review, idx) => (
                <SwiperSlide key={idx}>
                  <ReviewCard review={review} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Arrows */}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ScholarshipDetails;
