const Title = (props = {}) => {
  const { children } = props || {};

  return (
    <div>
      {" "}
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
            <h1 className="mb-5 text-3xl font-bold">{children}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;
