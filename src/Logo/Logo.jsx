import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="inline-block w-fit">
      <h2 className="text-xl font-bold text-primary">
        <span className="inline-block -rotate-[10deg]">Uni</span>
        <span className="text-secondary">Scholar</span>
      </h2>
    </Link>
  );
};

export default Logo;
