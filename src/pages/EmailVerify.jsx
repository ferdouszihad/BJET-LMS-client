import { useContext } from "react";
import image from "../assets/c7e9adfe-8eff-4bc5-84d6-986a99da78a9.png";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const EmailVerify = () => {
  const { verifyUserEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleVerify = () => {
    verifyUserEmail().then(() => {
      toast.success("Verificitaion link sent.  Check your email");
      setTimeout(() => {
        window.open("https://mail.google.com", "_blank");
      }, 3000);
    });
  };
  return (
    <div className="py-10 space-y-5">
      <h2 className="text-2xl font-bold text-center">
        Opps!! Email is not verified
      </h2>

      <div className="text-center">
        <button className="btn btn-outline btn-primary" onClick={handleVerify}>
          <img
            src="https://img.icons8.com/?size=96&id=qyRpAggnV0zH&format=png"
            alt=""
            className="w-6"
          />
          Verify Email
        </button>
      </div>

      <img className="mx-auto max-w-xs" src={image} alt="" />
    </div>
  );
};

export default EmailVerify;
