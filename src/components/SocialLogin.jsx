import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { signInWithGoogle, setLoading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        const { user } = res;
        axiosPublic
          .post("/users/login", {
            name: user.displayName,
            email: user.email,
            role: "student",
          })
          .then(() => {
            navigate(`${location?.state ? location.state : "/"}`);
          })
          .catch((err) => {
            console.log(err);

            navigate(`${location?.state ? location.state : "/"}`);
          });
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <div className="flex items-center gap-2 justify-around">
      <button onClick={handleGoogleLogin} type="button" className="btn w-full">
        Join with <FcGoogle className="text-2xl"></FcGoogle>
      </button>
    </div>
  );
};

export default SocialLogin;
