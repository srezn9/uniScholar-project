import { Navigate, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../shared/Loader";



const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const { data: roleData, isLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axios.get(`https://unischolar-server.vercel.app/users/role/${user.email}`);
      return res.data?.role || "user";
    },
  });

  if (loading || isLoading) {
    return <Loader />;
  }

  if (user && roleData === "admin") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
