import { Link } from "react-router-dom";
import image from "../assets/forbidden.png";
const Forbidden = () => {
  return (
    <div className="w-11/12 mx-auto flex flex-col items-center *:text-center gap-2">
      <img className="w-40" src={image} alt="" />
      <h2 className="text-4xl font-bold">Forbidden</h2>
      <p className="text-xl mb-3">
        You are Not Allowed to Access This Page right Now
      </p>
      <Link to={"/"}>
        <button className="btn btn-outline btn-primary">Back To Home</button>
      </Link>
    </div>
  );
};

export default Forbidden;
