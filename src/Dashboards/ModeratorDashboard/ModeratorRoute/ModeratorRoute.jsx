import { Navigate, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../shared/Loader";

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const { data: roleData, isLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/users/role/${user.email}`);
      return res.data?.role || "moderator"; // Ensure it returns a value
    },
  });

  if (loading || isLoading) {
    return <Loader></Loader>;
  }

  if (user && roleData === "moderator") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default ModeratorRoute;
