import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";


const AddScholarshipAdmin = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const imageHostKey = import.meta.env.VITE_IMAGE_UPLOAD_KEY;

  const onSubmit = async (data) => {
    const imageFile = data.universityImage[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      // Upload image to imgbb
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
        formData
      );
      const imageUrl = imgRes.data.data.display_url;

      // Build scholarship object
      const scholarshipData = {
        scholarshipName: data.scholarshipName,
        universityName: data.universityName,
        universityLogo: imageUrl,
        country: data.country,
        city: data.city,
        worldRank: parseInt(data.worldRank),
        subjectName: data.subjectCategory,
        scholarshipCategory: data.scholarshipCategory,
        degree: data.degree,
        tuitionFees: data.tuitionFees ? parseFloat(data.tuitionFees) : null,
        applicationFees: parseFloat(data.applicationFees),
        serviceCharge: parseFloat(data.serviceCharge),
        applicationDeadline: data.deadline,
        postDate: new Date().toISOString().split("T")[0],
        postedBy: user?.email || data.postedBy,
      };

      // Submit to DB
      const res = await axios.post(
        "https://unischolar-server.vercel.app/scholarships",
        scholarshipData
      );

      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire("Success!", "Scholarship added successfully", "success");
        reset();
        navigate("/adminDashboard/manage-scholarships-admin");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to upload image or add scholarship", "error");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-primary">
        Add New Scholarship
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("scholarshipName")}
          placeholder="Scholarship Name"
          className="input input-bordered w-full"
          required
        />
        <input
          {...register("universityName")}
          placeholder="University Name"
          className="input input-bordered w-full"
          required
        />
        <input
          {...register("universityImage")}
          type="file"
          className="file-input w-full"
          required
        />
        <input
          {...register("country")}
          placeholder="University Country"
          className="input input-bordered w-full"
          required
        />
        <input
          {...register("city")}
          placeholder="University City"
          className="input input-bordered w-full"
          required
        />
        <input
          {...register("worldRank")}
          placeholder="University World Rank"
          type="number"
          className="input input-bordered w-full"
          required
        />

        <select
          {...register("subjectCategory")}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Subject Category</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Engineering">Engineering</option>
          <option value="Doctor">Doctor</option>
        </select>

        <select
          {...register("scholarshipCategory")}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Scholarship Category</option>
          <option value="Full fund">Full fund</option>
          <option value="Partial">Partial</option>
          <option value="Self-fund">Self-fund</option>
        </select>

        <select
          {...register("degree")}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Degree</option>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
        </select>

        <input
          {...register("tuitionFees")}
          type="number"
          placeholder="Tuition Fees (Optional)"
          className="input input-bordered w-full"
        />
        <input
          {...register("applicationFees")}
          type="number"
          placeholder="Application Fees"
          className="input input-bordered w-full"
          required
        />
        <input
          {...register("serviceCharge")}
          type="number"
          placeholder="Service Charge"
          className="input input-bordered w-full"
          required
        />
        <input
          {...register("deadline")}
          type="date"
          className="input input-bordered w-full"
          required
        />

        <input
          {...register("postedBy")}
          defaultValue={user?.email || ""}
          readOnly
          className="input input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary w-full">
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarshipAdmin;
