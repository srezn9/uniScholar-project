import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaGraduationCap, FaGlobeAmericas, FaMoneyBillWave } from "react-icons/fa";

import "swiper/css";

const Banner = () => {
  const slides = [
    {
      bg: "from-indigo-500 via-purple-500 to-pink-500",
      icon: <FaGraduationCap className="text-4xl md:text-6xl mb-4" />,
      title: "Apply for Global Scholarships",
      desc: "Start your journey to success with the right funding!",
    },
    {
      bg: "from-green-400 via-blue-500 to-purple-600",
      icon: <FaGlobeAmericas className="text-4xl md:text-6xl mb-4" />,
      title: "Study Abroad Made Easy",
      desc: "Explore top universities and smooth your application process.",
    },
    {
      bg: "from-yellow-400 via-red-500 to-pink-500",
      icon: <FaMoneyBillWave className="text-4xl md:text-6xl mb-4" />,
      title: "Win Fully Funded Offers",
      desc: "Grab life-changing scholarship deals before they’re gone!",
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3500 }}
        loop={true}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`w-full h-[60vh] bg-gradient-to-r ${slide.bg} flex flex-col items-center justify-center text-white text-center px-4`}
            >
              {slide.icon}
              <h2 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-base md:text-lg max-w-2xl drop-shadow-md">
                {slide.desc}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
