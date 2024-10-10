import Navbar from "../components/Navbar";

const Error = () => {
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="py-10">
        <h2 className="text-9xl font-bold text-center">404</h2>
        <p className="text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Reprehenderit hic fuga ipsa veritatis nulla perferendis nobis dolore
          quas a nihil.
        </p>
      </main>
    </>
  );
};

export default Error;
