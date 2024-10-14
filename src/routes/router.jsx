import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error from "../pages/Error";
import PrivateRoute from "../routes/PrivateRoute";
import Play from "../pages/Play";
import PublicOnlyRoute from "./PublicOnlyRoute";
import ForgotPass from "../pages/ForgotPass";
import VerifiedRoute from "./VerifiedRoute";
import SuperPrivate from "../pages/SuperPrivate";
import Dashboard from "../layouts/Dashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import ThemeSetting from "../pages/Dashboard/ThemeSetting";
import UserSettings from "../pages/Dashboard/UserSettings";
import CreateCourse from "../pages/Dashboard/CreateCourse";
import ManageCourses from "../pages/Dashboard/ManageCourses";
import CreateModule from "../pages/Dashboard/CreateModule";
import CreateNewModule from "../pages/CreateNewModule";
import CreateContent from "../pages/CreateContent";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <Error></Error>,
    children: [
      {
        path: "",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "create-course",
        element: <CreateCourse></CreateCourse>,
      },

      {
        path: "/module/create-content/:id",
        element: <CreateContent></CreateContent>,
      },
      {
        path: "/manage-course/:id",
        element: <ManageCourses></ManageCourses>,
      },
      {
        path: "/dashboard/theme",
        element: <ThemeSetting></ThemeSetting>,
      },
      {
        path: "/dashboard/me",
        element: <UserSettings></UserSettings>,
      },
    ],
  },
  {
    path: "/auth",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "forget-pass",
        element: (
          <PublicOnlyRoute>
            <ForgotPass></ForgotPass>
          </PublicOnlyRoute>
        ),
      },
      {
        path: "play",
        element: (
          <PrivateRoute>
            <Play></Play>
          </PrivateRoute>
        ),
      },
      {
        path: "super-private",
        element: (
          <PrivateRoute>
            <VerifiedRoute>
              <SuperPrivate></SuperPrivate>
            </VerifiedRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
