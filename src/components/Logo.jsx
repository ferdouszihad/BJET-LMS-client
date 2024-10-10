import { FaFan } from "react-icons/fa6";

const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <span className="text-lg font-bold">L</span>
      <FaFan className="text-3xl text-primary animate-spin "></FaFan>
      <span className="text-lg font-bold">S</span>
    </div>
  );
};

export default Logo;
