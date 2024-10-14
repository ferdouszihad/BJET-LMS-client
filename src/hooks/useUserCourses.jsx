import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useUserCourses = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: courses, isLoading: isCourseLoading } = useQuery({
    queryKey: [user?.email, "courses-user"],
    enabled: !loading,
    queryFn: async () => {
      console.log("asking or checking is admin", user);
      const res = await axiosSecure.get(`/courses/user/${user.email}`);
      // console.log(res.data);
      return res.data;
    },
  });

  return { courses, isCourseLoading };
};

export default useUserCourses;
