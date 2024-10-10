const Banner = () => {
  return (
    <div className="hero my-5 rounded-lg skeleton">
      <div className="hero-overlay bg-opacity-50 rounded-lg"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-full py-10">
          <h1 className="mb-5 text-5xl font-bold">
            Complete Authentication Template
          </h1>
          <p className="mb-5">Clone , Modify and Run</p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
