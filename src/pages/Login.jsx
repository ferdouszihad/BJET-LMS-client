import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaFan } from "react-icons/fa6";

import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState({});
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { loading, setLoading, signInUser } = useContext(AuthContext);
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    setError({ ...error, login: null });
    const form = e.target;
    const email = form.email.value;
    const pass = form.pass.value;
    signInUser(email, pass)
      .then(() => {
        navigate(`${location?.state ? location.state : "/"}`);
      })
      .catch((err) => {
        setLoading(false);
        setError({ ...error, login: err.code });
      });
  };
  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-2xl text-center pb-10 font-semibold">Login Now</h2>
      <div className="card bg-base-100 w-full max-w-sm shrink-0  mx-auto  shadow-2xl">
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          {error.login && (
            <p className="text-sm text-red-500">
              Opps! {error.login} . try again
            </p>
          )}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="pass"
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <Link
                to="/auth/forget-pass"
                state={email || ""}
                className="label-text-alt link link-hover"
              >
                Forgot password?
              </Link>
            </label>
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              Login Now
              {loading && <FaFan className="animate-spin text-neutral"></FaFan>}
            </button>
          </div>

          <div>
            <p className="text-sm text-center py-2">
              Don&apos;t have any account?{" "}
              <Link
                to="/auth/register"
                state={location.state}
                className="underline text-primary"
              >
                Register Now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
