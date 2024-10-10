import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="w-11/12 mx-auto py-10">
      <div
        className="hero place-items-start rounded-lg"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
        }}
      >
        <div className="hero-overlay bg-opacity-90 rounded-lg"></div>
        <div className="hero-content text-neutral-content ">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-bold">
              Hello {user?.displayName}
            </h1>
            <p className="mb-5">
              Welcome to Dashboard. Enjoy Learning and Grow as a Super Hero{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
