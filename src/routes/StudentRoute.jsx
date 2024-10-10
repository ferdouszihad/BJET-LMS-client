import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import Forbidden from "../pages/Forbidden";
import { node } from "prop-types";

const StudentRoute = (props = {}) => {
  const { children } = props || node;
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useAdmin();

  if (loading || isRoleLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && role == "student") {
    return children;
  }

  return <Forbidden></Forbidden>;
};

export default StudentRoute;
