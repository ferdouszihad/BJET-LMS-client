import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useParams } from "react-router-dom";

const useCourseModules = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const {
    data: modules = [],
    isLoading: isModulesLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "courses-module"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/courses/modules/${id}`);
      console.log(res.data);
      return res.data;
    },
  });

  return { modules, isModulesLoading, refetch };
};

export default useCourseModules;
