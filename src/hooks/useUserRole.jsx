import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: role, isPending: isRoleLoading } = useQuery({
    queryKey: [user?.email, "role"],
    enabled: !loading && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      console.log("asking or checking is admin", user);
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data?.role;
    },
  });
  console.log(role, isRoleLoading);
  return { role, isRoleLoading };
};

export default useUserRole;
