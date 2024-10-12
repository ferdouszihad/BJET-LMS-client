import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../pages/Loading";
import CourseCard from "./CourseCard";
import { PiPlus } from "react-icons/pi";
import { Link } from "react-router-dom";
import useTeachingCourses from "../hooks/useTeachingCourses";

const DashboardTeacher = () => {
  const { user } = useContext(AuthContext);
  const { courses, isCourseLoading } = useTeachingCourses();
  if (isCourseLoading) {
    return <Loading></Loading>;
  }
  console.log(courses);

  return (
    <div>
      <div
        className="hero place-items-start rounded-lg"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
        }}
      >
        <div className="hero-overlay bg-opacity-90 rounded-lg"></div>
        <div className="hero-content text-neutral-content ">
          <div className="max-w-lg">
            <h1 className="mb-5 text-4xl font-bold">
              Hello {user?.displayName}
            </h1>
            <p className="mb-5">
              Welcome to Dashboard. Enjoy Teaching and Grow as a Super Hero
            </p>
          </div>
        </div>
      </div>

      <div className="pt-5 flex justify-between flex-wrap">
        <h2 className="text-2xl font-bold text-primary">Running Courses</h2>
        <button className="btn btn-primary flex btn-outline">
          <Link to="/create-course" className="flex gap-2">
            Create New<PiPlus></PiPlus>
          </Link>
        </button>
      </div>

      <div className="courses">
        {courses.length == 0 ? (
          <div className="py-10 text-center space-y-5">
            <h2 className="text-2xl">No courses Created yet</h2>
            <button className="btn btn-primary">Create a Course</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
            {courses.map((course) => (
              <CourseCard key={course._id} data={course}></CourseCard>
            ))}
          </div>
        )}
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default DashboardTeacher;
