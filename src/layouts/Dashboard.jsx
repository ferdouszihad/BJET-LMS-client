import { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgFormatColor } from "react-icons/cg";
import { FaBars, FaFan, FaGear } from "react-icons/fa6";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { MdGolfCourse } from "react-icons/md";

const Dashboard = () => {
  const { logOut, user } = useContext(AuthContext);

  const teacherRoutes = [
    {
      name: "My Courses",
      path: "/create-course",
      icon: <MdGolfCourse></MdGolfCourse>,
    },
    {
      name: "My Contents",
      path: "/my-contents",
      icon: <MdGolfCourse></MdGolfCourse>,
    },
  ];
  const studentRoutes = [
    {
      name: "My Courses",
      path: "/create-course",
      icon: <MdGolfCourse></MdGolfCourse>,
    },
    {
      name: "LeaderBoard",
      path: "/my-contents",
      icon: <MdGolfCourse></MdGolfCourse>,
    },
  ];
  const AdminRoutes = [
    {
      name: "Manage Users",
      path: "/create-course",
      icon: <MdGolfCourse></MdGolfCourse>,
    },
    {
      name: "Manage Courses",
      path: "/my-contents",
      icon: <MdGolfCourse></MdGolfCourse>,
    },
  ];
  const handleLogout = () => {
    Swal.fire({
      title: "Are you want to LogOut?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes ",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
      }
    });
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        <div>
          <nav className="py-2 px-1 bg-base-200 flex justify-between lg:hidden">
            <label
              htmlFor="my-drawer-2"
              className="drawer-button lg:hidden cursor-pointer"
            >
              <FaBars className="text-3xl"></FaBars>
            </label>
            <div className="flex items-center gap-2 justify-center">
              <FaFan className="text-3xl text-primary animate-spin"></FaFan>
              <h2 className="text-xl font-bold">BJET-LMS</h2>
            </div>
            <div></div>
          </nav>
          <main className="">
            <Outlet></Outlet>
          </main>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4 space-y-3">
          {/* Sidebar content here */}
          <Link to="/" className="flex items-center gap-2 py-5 ">
            <FaFan className="text-3xl text-primary animate-spin"></FaFan>
            <h2 className="text-xl font-bold">BJET-LMS</h2>
          </Link>
          <div className="flex gap-2 items-center">
            <div className="">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={user?.photoURL}
                alt=""
              />
            </div>
            <div className="">
              <h2 className="font-semibold">{user?.displayName}</h2>
              <p className="text-sm">{user?.email}</p>
            </div>
          </div>
          <hr className="divider" />
          {user?.role === "teacher" &&
            teacherRoutes.map((route) => (
              <li key={route.path}>
                <NavLink to={route.path}>
                  {route.icon} {route.name}
                </NavLink>
              </li>
            ))}
          {user?.role === "student" &&
            studentRoutes.map((route) => (
              <li key={route.path}>
                <NavLink to={route.path}>
                  {route.icon} {route.name}
                </NavLink>
              </li>
            ))}
          {user?.role === "admin" &&
            AdminRoutes.map((route) => (
              <li key={route.path}>
                <NavLink to={route.path}>
                  {route.icon} {route.name}
                </NavLink>
              </li>
            ))}

          <li className="">
            <NavLink to="/dashboard/me">
              <FaGear></FaGear>User Setting
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/dashboard/theme">
              <CgFormatColor></CgFormatColor>Theme Setting
            </NavLink>
          </li>
          <hr className="divider" />
          <li className="">
            <button onClick={handleLogout}>
              <BiLogOut></BiLogOut> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
