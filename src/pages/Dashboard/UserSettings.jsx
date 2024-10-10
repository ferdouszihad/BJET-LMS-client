import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FaEnvelope, FaImage, FaPassport, FaUser } from "react-icons/fa6";

const UserSettings = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="w-11/12 mx-auto py-5">
      <div
        className="hero rounded-lg mb-10"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
        }}
      >
        <div className="hero-overlay bg-opacity-90 rounded-lg"></div>
        <div className="text-neutral-content py-5 w-11/12">
          <div className="">
            <h1 className="mb-5 text-5xl font-bold">My Profile</h1>
          </div>
        </div>
      </div>

      <div className="bg-base-200 grid md:grid-cols-2 gap-5 p-5 rounded">
        <div>
          <h2 className="font-bold flex items-center gap-2 text-primary">
            {" "}
            <FaUser></FaUser> Name
          </h2>
          <p className="text-xl">{user?.displayName}</p>
        </div>
        <div>
          <h2 className="font-bold flex items-center gap-2 text-primary">
            {" "}
            <FaEnvelope></FaEnvelope> Email
          </h2>
          <p className="text-xl">{user?.email}</p>
        </div>
        <div>
          <h2 className="font-bold flex items-center gap-2 text-primary">
            {" "}
            <FaImage></FaImage> Photo-URL
          </h2>
          <p className="text-xl">{user?.photoURL}</p>
        </div>
        <div>
          <h2 className="font-bold flex items-center gap-2 text-primary">
            {" "}
            <FaImage></FaImage> Verification Status
          </h2>
          <p className="text-xl">
            {user?.emailVerified ? "Verified" : "Not Verified"}
          </p>
        </div>
        <div>
          <h2 className="font-bold flex items-center gap-2 text-primary">
            {" "}
            <FaPassport></FaPassport> Password
          </h2>
          <p className="italic">password will always hidden</p>
          <button className="btn btn-xs btn-secondary">Update Password</button>
        </div>
        <div className="">
          <button className="btn btn-primary ">Update Info</button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
