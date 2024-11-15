import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useTeachingCourses = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: courses = [], isLoading: isCourseLoading } = useQuery({
    queryKey: [user?.email, "courses-teacher"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/courses/teaching/${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  return { courses, isCourseLoading };
};

export default useTeachingCourses;
