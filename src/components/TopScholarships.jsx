import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";

const TopScholarships = () => {
  const navigate = useNavigate();

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["top-scholarships"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/scholarships/top");
      return res.json();
    },
  });

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return "No Rating";
    const total = reviews.reduce((sum, r) => sum + r.ratingPoint, 0);
    return (total / reviews.length).toFixed(1);
  };

  if (isLoading) return <p className="text-center text-lg font-semibold">Loading...</p>;

  return (
    <div className="my-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        🎓 Top Scholarships
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {scholarships.map((s) => (
          <div
            key={s._id}
            className="bg-white shadow-md border border-gray-200 rounded-tl-3xl rounded-br-3xl overflow-hidden hover:shadow-xl transition duration-300 group"
          >
            {/* University Image */}
            <div className="relative">
              <img
                src={s.universityLogo}
                alt={s.universityName}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-0 left-0 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-br-2xl shadow-md">
                {s.scholarshipCategory}
              </div>
            </div>

            {/* Scholarship Info */}
            <div className="p-5 space-y-1">
              <h3 className="text-xl font-bold text-gray-800">{s.universityName}</h3>
              <p className="text-sm text-gray-600">{s.subjectName}</p>
              <p className="text-sm text-gray-500">
                📍 {s.location.city}, {s.location.country}
              </p>
              <p className="text-sm text-gray-500">
                Deadline:{" "}
                <span className="text-red-500 font-medium">{s.applicationDeadline}</span>
              </p>
              <p className="text-sm text-gray-600">
                Application Fee:{" "}
                <span className="text-emerald-600 font-semibold">${s.applicationFees}</span>
              </p>
              <p className="text-sm text-yellow-600">
                ⭐ {calculateAverageRating(s.reviews)}
              </p>

              {/* Details Button */}
              <Link to={`/scholarships/${s._id}`}>
                <button className="mt-3 bg-primary text-white px-4 py-1 rounded-md hover:bg-[#3A3640] transition duration-300">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/allScholarship")}
          className="bg-secondary text-white px-6 py-2 rounded-full hover:bg-[#994B4B] transition"
        >
          View All Scholarships
        </button>
      </div>
    </div>
  );
};

export default TopScholarships;
