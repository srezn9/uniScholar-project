import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router"; 
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContext";

const Login = () => {
  const { login, googleLogin, user, userRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const [redirectPending, setRedirectPending] = useState(false); 

  const getFriendlyErrorMessage = (error) => {
    if (!error?.code) return "Something went wrong. Please try again.";
    switch (error.code) {
      case "auth/user-not-found":
        return "No user found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-email":
        return "Invalid email format.";
      case "auth/user-disabled":
        return "This account has been disabled.";
      case "auth/popup-closed-by-user":
        return "Google login was cancelled.";
      case "auth/network-request-failed":
        return "Network error. Check your internet connection.";
      default:
        return "Login failed. Please check your credentials.";
    }
  };

  
  useEffect(() => {
    if (redirectPending && user && userRole) {
      let target = "/userDashboard";
      if (userRole === "admin") target = "/adminDashboard";
      else if (userRole === "moderator") target = "/moderatorDashboard";

      navigate(target);
    }
  }, [user, userRole, redirectPending, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password)
      .then(() => {
        Swal.fire({
          title: "Welcome Back!",
          text: "You have successfully logged in.",
          icon: "success",
          iconColor: "#14b8a6",
          background: "#f5f3ff",
          color: "#4c1d95",
          confirmButtonText: "Let's Go!",
          confirmButtonColor: "#8b5cf6",
          customClass: {
            popup: "rounded-xl shadow-lg",
            confirmButton: "px-4 py-2 text-white font-semibold",
          },
          timer: 2000,
        });
        setRedirectPending(true); 
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Failed",
          text: getFriendlyErrorMessage(error),
          icon: "error",
          iconColor: "#e11d48",
          background: "#fdf4ff",
          color: "#701a75",
          confirmButtonText: "Try Again",
          confirmButtonColor: "#c084fc",
          customClass: {
            popup: "rounded-xl shadow-lg",
            confirmButton: "px-4 py-2 text-white font-semibold",
          },
        });
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        Swal.fire({
          title: "Logged in with Google!",
          text: "Welcome to the app.",
          icon: "success",
          iconColor: "#14b8a6",
          background: "#f5f3ff",
          color: "#4c1d95",
          confirmButtonText: "Continue",
          confirmButtonColor: "#8b5cf6",
          customClass: {
            popup: "rounded-xl shadow-lg",
            confirmButton: "px-4 py-2 text-white font-semibold",
          },
          timer: 2000,
        });
        setRedirectPending(true);
      })
      .catch((error) => {
        Swal.fire({
          title: "Google Login Failed",
          text: getFriendlyErrorMessage(error),
          icon: "error",
          iconColor: "#e11d48",
          background: "#fdf4ff",
          color: "#701a75",
          confirmButtonText: "Retry",
          confirmButtonColor: "#c084fc",
          customClass: {
            popup: "rounded-xl shadow-lg",
            confirmButton: "px-4 py-2 text-white font-semibold",
          },
        });
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl my-12 text-base-content">
      <h2 className="text-center p-5 text-3xl font-bold">Login Now</h2>

      <form onSubmit={handleLogin} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input input-bordered"
            placeholder="Email"
            required
          />

          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input input-bordered"
            placeholder="Password"
            required
          />

          <div>
            <button type="button" className="link link-hover text-secondary">
              Forgot password?
            </button>
          </div>

          <button
            className="btn bg-secondary hover:bg-[#994B4B] text-white mt-4"
            type="submit"
          >
            Login
          </button>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="btn border mt-3 flex items-center justify-center gap-2"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </button>

          <p className="pt-5 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-secondary underline">
              Register
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
