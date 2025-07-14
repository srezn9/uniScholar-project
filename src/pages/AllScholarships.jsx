import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import Loader from "../shared/Loader";


const fetchScholarships = async () => {
  const res = await axios.get("https://unischolar-server.vercel.app/scholarships");
  return res.data;
};


const calculateAverageRating = (reviews = []) => {
  if (reviews.length === 0) return "No reviews yet";
  const total = reviews.reduce((sum, r) => sum + r.ratingPoint, 0);
  return (total / reviews.length).toFixed(1);
};

const AllScholarships = () => {
  const [searchText, setSearchText] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();


  const {
    data: scholarships = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["scholarships"],
    queryFn: fetchScholarships,
    
  });


  useEffect(() => {
    setFiltered(scholarships);
    setCurrentPage(1);
  }, [scholarships]);

  
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!searchText.trim()) {
       
        setFiltered(scholarships);
      } else {
        const query = searchText.toLowerCase();
        const result = scholarships.filter((item) =>
          (item.universityName || "").toLowerCase().includes(query) ||
          (item.subjectName || "").toLowerCase().includes(query) ||
          (item.scholarshipCategory || "").toLowerCase().includes(query)
        );
        setFiltered(result);
      }
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchText, scholarships]);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500 font-semibold">
        Failed to load data.
      </div>
    );

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentScholarships = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto">
     
      <div className="flex justify-center mb-6 gap-2 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by University, Degree, or Scholarship"
          className="input input-bordered w-full"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          aria-label="Search Scholarships"
        />
        
        <button
          onClick={() => {
            
            const query = searchText.toLowerCase();
            const result = scholarships.filter((item) =>
              (item.universityName || "").toLowerCase().includes(query) ||
              (item.subjectName || "").toLowerCase().includes(query) ||
              (item.scholarshipCategory || "").toLowerCase().includes(query)
            );
            setFiltered(result);
            setCurrentPage(1);
          }}
          className="btn btn-primary"
        >
          Search
        </button>
      </div>

      
      <h2 className="text-3xl font-bold text-center mb-6">All Scholarships</h2>

      
      {currentScholarships.length === 0 ? (
        <p className="text-center text-gray-500">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentScholarships.map((item) => (
            <div
              key={item._id}
              className="rounded-tl-3xl rounded-br-3xl p-4 shadow-xl hover:shadow-2xl transition duration-300 border border-accent bg-white flex flex-col"
            >
              <img
                src={item.universityLogo}
                alt={`${item.universityName} logo`}
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
                <strong>Scholarship Category:</strong> {item.scholarshipCategory}
              </p>
              <p>
                <strong>Deadline:</strong> {item.applicationDeadline}
              </p>
              <p>
                <strong>Fees:</strong> ${item.applicationFees}
              </p>
              <p>
                <strong>Rating:</strong> ⭐ {calculateAverageRating(item.reviews)}
              </p>
              <button
                onClick={() => navigate(`/scholarships/${item._id}`)}
                className="btn btn-sm mt-auto btn-primary"
                aria-label={`View details about ${item.universityName} scholarship`}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2 flex-wrap">
          <button
            className="btn btn-outline"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={`btn ${currentPage === num ? "btn-primary" : "btn-outline"}`}
              onClick={() => setCurrentPage(num)}
              aria-current={currentPage === num ? "page" : undefined}
              aria-label={`Go to page ${num}`}
            >
              {num}
            </button>
          ))}

          <button
            className="btn btn-outline"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllScholarships;
