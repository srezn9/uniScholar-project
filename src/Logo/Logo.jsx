import React from "react";
import { Link } from "react-router"; // Make sure to use this instead of 'react-router'

const Logo = () => {
  return (
    <Link to="/" className="block w-fit mx-auto mb-4">
      <h2 className="text-3xl font-extrabold tracking-wider text-white drop-shadow-lg">
        <span className="inline-block -rotate-[10deg] text-yellow-300">Uni</span>
        <span className="text-white">Scholar</span>
      </h2>
    </Link>
  );
};

export default Logo;
