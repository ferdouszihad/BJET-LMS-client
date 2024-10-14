import { useQuery } from "@tanstack/react-query";
import Title from "../../components/Title";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import CourseInfo from "../../components/CourseInfo";
import ManageModule from "./ManageModule";

const ManageCourses = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { user, loading } = useContext(AuthContext);
  //requery for data fetching
  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manageCourses", user?.email, id],
    enabled: !loading,
    // Fetch the data from the API
    queryFn: async () => {
      const res = await axiosSecure.get(`/courses/single/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  return (
    <div className="w-11/12 mx-auto py-10">
      <Title>{data?.courseName}</Title>
      <Tabs>
        {/* Tab List */}
        <TabList className="tabs flex justify-between border-b pt-5">
          <Tab className="tab tab-bordered" selectedClassName="tab-active">
            Course Info
          </Tab>
          <Tab className="tab tab-bordered" selectedClassName="tab-active">
            Modules
          </Tab>
          <Tab className="tab tab-bordered" selectedClassName="tab-active">
            Students
          </Tab>
          <Tab className="tab tab-bordered" selectedClassName="tab-active">
            Members
          </Tab>
        </TabList>

        {/* Tab Panels */}
        <TabPanel>
          <CourseInfo course={data} refetch={refetch}></CourseInfo>
        </TabPanel>
        <TabPanel>
          <ManageModule course={data} refetch={refetch}></ManageModule>
        </TabPanel>
        <TabPanel>
          <div className="p-4 bg-base-100 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Students</h2>
            <p>This is the Students content.</p>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="p-4 bg-base-100 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Members</h2>
            <p>This is the Members content.</p>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ManageCourses;
