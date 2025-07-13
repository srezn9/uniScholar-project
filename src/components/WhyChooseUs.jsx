
import { FaUserGraduate, FaUniversity, FaCheckCircle } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="bg-[#FAF9F6] py-16 px-4 md:px-8 lg:px-20 text-[#2D2A32]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
          Why Choose Us
        </h2>
        <p className="text-base md:text-lg text-[#78716C] max-w-2xl mx-auto mb-12">
          We connect students with verified scholarships and universities across
          the globe. Trusted by thousands of applicants every year.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
            <FaUserGraduate className="text-3xl text-[#B25D5D] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Student-Centered</h3>
            <p className="text-sm text-[#6B7280]">
              Designed to support your academic goals with easy application
              tools and personalized options.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
            <FaUniversity className="text-3xl text-[#B25D5D] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Global Universities</h3>
            <p className="text-sm text-[#6B7280]">
              Discover scholarships from trusted institutions across diverse
              fields and academic levels.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
            <FaCheckCircle className="text-3xl text-[#B25D5D] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
            <p className="text-sm text-[#6B7280]">
              Every scholarship is verified by our moderation team for accuracy
              and legitimacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
