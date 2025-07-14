import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import Loader from "../../shared/Loader";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

const AnalyticsCharts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await axios.get(
        "https://unischolar-server.vercel.app/analytics/overview"
      );
      return res.data;
    },
  });

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold text-center text-primary">
        📊 Admin Analytics
      </h2>

      
      <div className="max-w-xl mx-auto">
        <h3 className="text-xl font-semibold mb-2 text-center">
          Users by Role
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.userRoles}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.userRoles.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Applications per Scholarship - Bar Chart */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-2 text-center">
          Top 5 Applied Scholarships
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.appPerScholarship}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
