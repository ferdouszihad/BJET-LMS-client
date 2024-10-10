import dance from "../assets/dancing.gif";
const SuperPrivate = () => {
  return (
    <div className="py-10 w-11/12 mx-auto flex flex-col items-center">
      <h2 className="text-6xl">Yahoo!!</h2>
      <p>Your are now Accesing a verified route. Your Email is Verified Now</p>
      <img src={dance} alt="" />
    </div>
  );
};

export default SuperPrivate;
