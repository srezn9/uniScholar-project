import useAuth from "../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();

//   Later (When You're Ready to Add Roles)
// Once you add a users collection in MongoDB with role, you'll do something like:

  //   const { data: userInfo } = useQuery({
  //     queryKey: ["userRole", user?.email],
  //     queryFn: async () => {
  //       const res = await axios.get(`http://localhost:5000/users/${user?.email}`);
  //       return res.data;
  //     },
  //     enabled: !!user?.email,
  //   });

//   {
//     userInfo?.role !== "user" && (
//       <p className="text-sm text-green-600 font-medium capitalize">
//         Role: {userInfo.role}
//       </p>
//     );
//   }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">My Profile</h2>
      <div className="flex flex-col items-center space-y-4">
        <img
          src={user?.photoURL || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="text-center">
          <h3 className="text-xl font-semibold">
            {user?.displayName || "Unknown User"}
          </h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
