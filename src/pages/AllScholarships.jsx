import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Loader from "../shared/Loader";

// Fetching all scholarships
const fetchScholarships = async () => {
  const res = await axios.get(
    "https://unischolar-server.vercel.app/scholarships"
  );
  return res.data;
};

// Calculate average rating
const calculateAverageRating = (reviews = []) => {
  if (reviews.length === 0) return "No reviews yet";
  const total = reviews.reduce((sum, r) => sum + r.ratingPoint, 0);
  return (total / reviews.length).toFixed(1);
};

const AllScholarships = () => {
  const [searchText, setSearchText] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show 6 scholarships per page
  const navigate = useNavigate();

  const {
    data: scholarships = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["scholarships"],
    queryFn: fetchScholarships,
  });

  // Set filtered list whenever data changes
  useEffect(() => {
    setFiltered(scholarships);
    setCurrentPage(1); // Reset page on new data
  }, [scholarships]);

  // Debounced search filter
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const query = searchText.toLowerCase();
      const result = scholarships.filter((item) => {
        return (
          (item.universityName || "").toLowerCase().includes(query) ||
          (item.subjectName || "").toLowerCase().includes(query) ||
          (item.scholarshipCategory || "").toLowerCase().includes(query)
        );
      });
      setFiltered(result);
      setCurrentPage(1); // Reset to first page when filtering
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchText, scholarships]);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500 font-semibold">
        Failed to load data.
      </div>
    );

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentScholarships = filtered.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-6">
      {/* Search Box */}
      <div className="flex justify-center mb-6 gap-2">
        <input
          type="text"
          placeholder="Search by University, Degree, or Scholarship"
          className="input input-bordered w-full max-w-sm"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={() => {}} className="btn btn-primary">
          Search
        </button>
      </div>

      {/* Scholarships List */}
      <h2 className="text-3xl font-bold text-center mb-6">All Scholarships</h2>
      {currentScholarships.length === 0 ? (
        <p className="text-center text-gray-500">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentScholarships.map((item) => (
            <div
              key={item._id}
              className="rounded-tl-3xl rounded-br-3xl p-4 shadow-xl hover:shadow-2xl transition duration-300 border border-accent bg-white"
            >
              <img
                src={item.universityLogo}
                alt={item.universityName}
                className="h-40 w-full object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold">{item.universityName}</h3>
              <p className="text-sm text-gray-600">
                {item.location?.city || item.city || "Unknown City"},{" "}
                {item.location?.country || item.country || "Unknown Country"}
              </p>
              <p className="mt-2">
                <strong>Subject:</strong> {item.subjectName}
              </p>
              <p>
                <strong>Scholarship Category:</strong>{" "}
                {item.scholarshipCategory}
              </p>
              <p>
                <strong>Deadline:</strong> {item.applicationDeadline}
              </p>
              <p>
                <strong>Fees:</strong> ${item.applicationFees}
              </p>
              <p>
                <strong>Rating:</strong> ⭐{" "}
                {calculateAverageRating(item.reviews)}
              </p>
              <button
                onClick={() => navigate(`/scholarships/${item._id}`)}
                className="btn btn-sm mt-3 btn-primary"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2 flex-wrap">
          <button
            className="btn btn-outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={`btn ${
                currentPage === num ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}

          <button
            className="btn btn-outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllScholarships;
