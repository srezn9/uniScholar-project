import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../shared/Loader";

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const { isLoading, isError } = useQuery({
    queryKey: ["editApplication", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://unischolar-server.vercel.app/user-applications/${id}`
      );
      return res.data;
    },
    enabled: !!id,
    onSuccess: (app) => {
      setValue("degree", app.degree || "");
      setValue("address", app.address || "");
    },
  });

  const onSubmit = async (formData) => {
    try {
      const res = await axios.put(
        `https://unischolar-server.vercel.app/applied-scholarships/${id}`,
        {
          degree: formData.degree,
          address: formData.address,
        }
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Application updated successfully", "success");
        navigate("/userDashboard/applications");
      } else {
        Swal.fire("Info", "No changes were made", "info");
      }
    } catch {
      Swal.fire("Error", "Failed to update application", "error");
    }
  };

  if (isLoading) return <Loader></Loader>;
  if (isError)
    return (
      <p className="text-center text-red-500">Failed to load application</p>
    );

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-primary">Edit Application</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Degree</label>
          <input
            {...register("degree", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Address</label>
          <input
            {...register("address", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="submit"
            className="btn bg-primary text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/userDashboard/applications")}
            className="btn bg-gray-200 text-black"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditApplication;
