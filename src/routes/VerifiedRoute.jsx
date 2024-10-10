import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../pages/Loading";
import EmailVerify from "../pages/EmailVerify";

const VerifiedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <Loading></Loading>;
  }
  if (user?.email && user?.emailVerified) {
    return children;
  }
  return <EmailVerify></EmailVerify>;
};

export default VerifiedRoute;
