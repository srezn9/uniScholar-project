import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router"; // ✅ fixed import
import Loader from "../shared/Loader";

// Fetching all scholarships
const fetchScholarships = async () => {
  const res = await axios.get("http://localhost:5000/scholarships");
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
  const navigate = useNavigate();

  // Fetch data using react-query
  const {
    data: scholarships = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["scholarships"],
    queryFn: fetchScholarships,
  });

  // Set filtered list whenever full list changes
  useEffect(() => {
    setFiltered(scholarships);
  }, [scholarships]);

  // Search filter
  const handleSearch = () => {
    const query = searchText.toLowerCase();
    const result = scholarships.filter((item) => {
      return (
        item.universityName.toLowerCase().includes(query) ||
        item.subjectName.toLowerCase().includes(query) ||
        item.scholarshipCategory.toLowerCase().includes(query)
      );
    });
    setFiltered(result);
  };

  // Also filter on typing
  useEffect(() => {
    const query = searchText.toLowerCase();
    const result = scholarships.filter((item) => {
      return (
        item.universityName.toLowerCase().includes(query) ||
        item.subjectName.toLowerCase().includes(query) ||
        item.scholarshipCategory.toLowerCase().includes(query)
      );
    });
    setFiltered(result);
  }, [searchText, scholarships]);

  // Loading state
  if (isLoading) {
    return <Loader></Loader>
  }

  // Error state
  if (isError) {
    return (
      <div className="text-center py-10 text-red-500 font-semibold">
        Failed to load data.
      </div>
    );
  }

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
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {/* Scholarships List */}
      <h2 className="text-3xl font-bold text-center mb-6">All Scholarships</h2>
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
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
              <p className="mt-2">
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
    </div>
  );
};

export default AllScholarships;
