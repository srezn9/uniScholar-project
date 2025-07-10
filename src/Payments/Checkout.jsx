import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const Checkout = () => {
  const { id } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const [paid, setPaid] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  // Load scholarship (GET)
  const { data: scholarship = {} } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/scholarships/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Create Stripe payment intent (POST)
  useEffect(() => {
    if (scholarship?.applicationFees) {
      axios
        .post("http://localhost:5000/create-payment-intent", {
          amount: scholarship.applicationFees,
        })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch(() =>
          Swal.fire("Error", "Error creating payment intent", "error")
        );
    }
  }, [scholarship]);

  // Stripe Payment
  const handleStripePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire("Payment Error", error.message, "error");
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      Swal.fire("Payment Error", confirmError.message, "error");
      return;
    }

    if (paymentIntent.status === "succeeded") {
      Swal.fire(
        "Payment Successful",
        "Your payment was processed successfully!",
        "success"
      );
      setPaid(true);
    }
  };

  // Form Submit with React Hook Form
  const onSubmit = async (data) => {
    const application = {
      ...data,
      universityName: scholarship.universityName,
      scholarshipCategory: scholarship.scholarshipCategory,
      subjectName: scholarship.subjectName,
      userName: user?.name,
      userEmail: user?.email,
      userId: user?._id,
      scholarshipId: scholarship?._id,
      appliedAt: new Date().toISOString(),
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/applied-scholarships",
        application
      );
      if (res.data.insertedId) {
        Swal.fire("Success", "Application submitted successfully!", "success");
        reset();
      }
    } catch {
      Swal.fire(
        "Submission Failed",
        "Failed to submit application. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">
        Apply for {scholarship?.universityName}
      </h2>

      {/* Stripe Card Payment */}
      {!paid && (
        <form
          onSubmit={handleStripePayment}
          className="space-y-4 p-4 border rounded"
        >
          <CardElement className="p-2 border rounded" />
          <button
            type="submit"
            disabled={!stripe || !clientSecret}
            className="btn btn-primary w-full"
          >
            Pay ${scholarship?.applicationFees}
          </button>
        </form>
      )}

      {/* React Hook Form */}
      {paid && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 border p-4 rounded"
        >
          <h3 className="text-xl font-semibold">Application Form</h3>

          <input
            {...register("phone", { required: true })}
            placeholder="Phone Number"
            className="input input-bordered w-full"
          />
          <input
            {...register("photo", { required: true })}
            placeholder="Photo URL"
            className="input input-bordered w-full"
          />
          <input
            {...register("address", { required: true })}
            placeholder="Address (village, district, country)"
            className="input input-bordered w-full"
          />

          <select
            {...register("gender", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>

          <select
            {...register("degree", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Applying Degree</option>
            <option>Diploma</option>
            <option>Bachelor</option>
            <option>Masters</option>
          </select>

          <input
            {...register("sscResult", { required: true })}
            placeholder="SSC Result"
            className="input input-bordered w-full"
          />
          <input
            {...register("hscResult", { required: true })}
            placeholder="HSC Result"
            className="input input-bordered w-full"
          />

          <select
            {...register("studyGap")}
            className="select select-bordered w-full"
          >
            <option value="">Study Gap (Optional)</option>
            <option>1 year</option>
            <option>2 years</option>
            <option>3+ years</option>
          </select>

          <input
            value={scholarship?.universityName}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
          <input
            value={scholarship?.scholarshipCategory}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
          <input
            value={scholarship?.subjectName}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />

          <button type="submit" className="btn btn-secondary w-full">
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
