import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../pages/Loading";
import Forbidden from "../pages/Forbidden";

const PublicOnlyRoute = (props = {}) => {
  const { children } = props || {};
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return children;
  }
  return <Forbidden></Forbidden>;
};

export default PublicOnlyRoute;
