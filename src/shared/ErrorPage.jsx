import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 text-primary px-4 py-10">
      
      <h1 className="text-3xl font-bold mb-4">
        <span className="inline-block -rotate-[10deg]">Uni</span>
        <span className="text-secondary">Scholar</span>
      </h1>

      
      <h2 className="text-8xl font-extrabold mb-4 text-error">404</h2>
      <h3 className="text-2xl font-semibold mb-2">Page Not Found</h3>
      <p className="text-center max-w-md mb-6">
        Sorry, the page you are looking for doesn't exist or has been moved.
        Let’s get you back to your academic journey!
      </p>

      
      <Link
        to="/"
        className="btn btn-primary text-white font-semibold px-6 py-2 rounded-lg"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
