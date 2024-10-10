import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { FaFan } from "react-icons/fa6";

const ForgotPass = () => {
  const [loading, setLoading] = useState(false);
  const { forgotPass } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleForgotPass = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(e.target.email?.value);
    forgotPass(e.target.email?.value)
      .then(() => {
        toast.success("A Password reset Successfull. Redirecting to Gmail");
        setLoading(false);
        setTimeout(() => {
          window.open("https://mail.google.com", "_blank");
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        toast.error(err.code);
        setLoading(false);
      });
  };

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-2xl font-bold text-center pb-5">
        Forgot Your Password??
      </h2>
      <div className="card bg-base-100 w-full max-w-sm  mx-auto shrink-0 shadow-2xl">
        <form onSubmit={handleForgotPass} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter Your Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              defaultValue={location?.state || ""}
              required
            />
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              Reset My Password
              {loading && <FaFan className="animate-spin text-neutral"></FaFan>}
            </button>
          </div>
          <div>
            <p className="text-sm text-center py-2">
              <Link to="/auth/login" className="underline text-primary">
                Back to Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
