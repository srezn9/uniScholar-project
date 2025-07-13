import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

// import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Contexts/AuthContext";
import axios from "axios";

const Register = () => {
  const { register, updateUserProfile, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  const showToast = (icon, title) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 3000,
      background: "#fff",
      color: "#333",
      iconColor: icon === "success" ? "#22c55e" : "#ef4444",
      customClass: {
        popup: "rounded-xl shadow-md border border-gray-200",
        title: "text-sm font-medium px-2 py-1",
      },
    });
  };

  const getErrorMessage = (error) => {
    if (!error?.code) return "Something went wrong. Please try again.";

    switch (error.code) {
      case "auth/email-already-in-use":
        return "This email is already registered. Try logging in.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password is too weak. Use at least 6 characters.";
      case "auth/network-request-failed":
        return "Network error. Check your connection.";
      default:
        return "Registration failed. Please try again.";
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);

    if (!uppercase || !lowercase || password.length < 6) {
      return showToast(
        "error",
        "Password must have at least one uppercase, one lowercase letter and be 6+ characters."
      );
    }

    try {
      // Register user in Firebase
      await register(email, password);

      // Update Firebase profile
      await updateUserProfile({ displayName: name, photoURL });

      // Show success toast for Firebase
      showToast("success", "Registered in Firebase. Saving user...");

      try {
        // Save to MongoDB
        await axios.post("https://unischolar-server.vercel.app/users", {
          name,
          email,
          role: "user",
        });

        showToast("success", "You have successfully registered to UniScholar");
        navigate("/");
      } catch (dbError) {
        console.error("Database save failed:", dbError);
        showToast(
          "error",
          "Registration succeeded, but failed to save user data."
        );
      }
    } catch (error) {
      console.error("Firebase error:", error);
      showToast("error", getErrorMessage(error));
    }
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        showToast("success", "You have succesfully logged in with Google!");
        navigate("/");
      })
      .catch((error) => {
        showToast("error", getErrorMessage(error));
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl my-12 text-base-content">
      {/* <Helmet>
              <title>Register || TutorSphere</title>
            </Helmet> */}
      <h2 className="text-center p-5 text-3xl font-bold">Register Now</h2>
      <form onSubmit={handleRegister} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            className="input input-bordered"
            placeholder="Your name"
            required
          />

          <label className="label">Photo URL</label>
          <input
            type="text"
            name="photoURL"
            className="input input-bordered"
            placeholder="Photo URL"
            required
          />

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

          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="terms"
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <label htmlFor="terms" className="text-sm">
              I accept the{" "}
              <Link to="/terms" className="text-secondary underline">
                Terms and Conditions
              </Link>
            </label>
          </div>

          <button
            className="btn bg-secondary hover:bg-[#994B4B] text-white mt-4"
            type="submit"
            disabled={!accepted}
          >
            Register
          </button>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="btn border mt-3 flex items-center justify-center gap-2"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </button>

          <p className="pt-5 text-center text-secondary">
            Already have an account?{" "}
            <Link to="/login" className="text-secondary underline">
              Login
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
