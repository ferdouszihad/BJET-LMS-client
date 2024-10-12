import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaFan } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../components/SocialLogin";
import useAxiosPublic from "../hooks/useAxiosPublic";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const { setUser, loading, setLoading, createUser, updateUserData } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [role, setRole] = useState(null);
  const [error, setError] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    //getting form data

    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const pass = form.pass.value;
    const passConfirm = form.passConfirm.value;
    const image = form.image.files[0];
    // console.log({ name, email, pass, passConfirm, imageURL });
    //from error handeling
    //password Validation
    if (pass.length < 6) {
      setError({ ...error, pass: "password should be more then 6 characters" });
      return;
    } else if (pass != passConfirm) {
      setError({ ...error, pass: "password does not matched" });
      return;
    } else {
      setError({ ...error, pass: null });
    }

    if (!role) {
      setError({ ...error, role: "please select role" });
      return;
    } else {
      setError({ ...error, role: null });
    }

    const formData = new FormData();
    formData.append("image", image);

    const res = await axiosPublic.post(image_hosting_api, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const imgUrl = res.data.data.display_url;
      console.log(imgUrl);
      createUser(email, pass)
        .then((res) => {
          updateUserData({
            displayName: name,
            photoURL: imgUrl,
          })
            .then(() => {
              axiosPublic
                .post("/users/login", { name, role, email })
                .then((data) => {
                  console.log(data);
                  //add user role to the user
                  setUser({
                    ...res.user,
                    displayName: name,
                    photoURL: imgUrl,
                    role,
                    courses: [],
                  });
                  navigate(`${location?.state ? location.state : "/"}`);
                })
                .catch((err) => {
                  console.log({ ...err });
                });
              //profile is updated with name and , photourl
              //this function doesnot hit onAuthState , so we will update data manually
            })

            .catch((err) => {
              console.log({ ...err });
            });
        })
        .catch((err) => {
          setLoading(false);
          setError({ ...error, register: err?.code });
        });
    }
  };
  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-2xl text-center pb-10 font-semibold">
        Registration Form
      </h2>
      <div className="card bg-base-100 w-full max-w-lg shrink-0  mx-auto  shadow-2xl">
        <form onSubmit={handleRegister} className="card-body">
          <div className="md:flex gap-2">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered "
                required
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Image</span>
            </label>
            <input
              type="file"
              name="image"
              className="file-input file-input-bordered w-full "
              required
              accept=".jpg .png .jpeg"
            />
          </div>
          {/* role  */}
          <p>Define Who you are </p>
          <div className="md:flex gap-2">
            <div className="form-control flex-1">
              <div
                onClick={() => setRole("teacher")}
                className={`p-3 border rounded flex items-center gap-2 cursor-pointer hover:bg-base-200 ${
                  role == "teacher" && "bg-green-200"
                }`}
              >
                <div className="">
                  <img
                    src="https://img.icons8.com/?size=120&id=J5Rh923VgFPM&format=png"
                    alt=""
                    className="w-10"
                  />
                </div>
                <span className="font-bold">Teacher</span>
              </div>
            </div>
            <div className="form-control flex-1">
              <div
                onClick={() => setRole("student")}
                className={`p-3 border rounded flex items-center gap-2 cursor-pointer hover:bg-base-200 ${
                  role == "student" && "bg-green-200"
                }`}
              >
                <div className="">
                  <img
                    src="https://img.icons8.com/?size=96&id=XKedzxVhRNPR&format=png"
                    alt=""
                    className="w-10"
                  />
                </div>
                <span className="font-bold">Student</span>
              </div>
            </div>
          </div>
          {error.role && (
            <p className="text-xs text-red-600">
              opps!! {error.role} || try again!
            </p>
          )}

          <div className="md:flex gap-2">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="pass"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="passConfirm"
                placeholder="confirm"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          {error.pass && <p className="text-xs text-red-600">{error.pass}</p>}
          {error.register && (
            <p className="text-xs text-red-600">
              opps!! {error.register} || try again!
            </p>
          )}

          <div className="form-control mt-6">
            <button disabled={loading} className="btn btn-primary">
              Register Now
              {loading && <FaFan className="animate-spin text-neutral"></FaFan>}
            </button>
          </div>

          <div>
            <p className="text-sm text-center py-2">
              Allready have account?{" "}
              <Link
                to="/login"
                state={location.state}
                className="underline text-primary"
              >
                Login Now
              </Link>
            </p>
          </div>
          <SocialLogin></SocialLogin>
        </form>
      </div>
    </div>
  );
};

export default Register;
