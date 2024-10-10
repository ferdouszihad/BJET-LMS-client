import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { ThemeContext } from "../../providers/ThemeProvider";

const ThemeSetting = () => {
  const { theme, changeDarkTheme, changeLightTheme } = useContext(ThemeContext);

  const lightThemes = [
    "light",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "garden",
    "lofi",
    "pastel",
    "fantasy",
  ];

  const darkThemes = [
    "dark",
    "halloween",
    "forest",
    "black",
    "luxury",
    "dracula",
    "night",
    "coffee",
    "winter",
  ];

  return (
    <div className="w-11/12 mx-auto py-5">
      <div
        className="hero rounded-lg"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
        }}
      >
        <div className="hero-overlay bg-opacity-90 rounded-lg"></div>
        <div className="text-neutral-content py-5 w-11/12">
          <div className="">
            <h1 className="mb-5 text-5xl font-bold">Theme Setting</h1>
            <p className="mb-5">
              You can configure your themes and Edit your profile from here.
            </p>
          </div>
        </div>
      </div>

      <div className="py-10">
        <h2 className="text-xl text-accent font-bold flex gap-2 items-center ">
          {" "}
          <FaSun /> Light Mood{" "}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 py-5">
          {lightThemes.map((tn) => (
            <div
              onClick={() => changeLightTheme(tn)}
              className={` ${
                tn == theme.light &&
                "border-primary bg-primary text-primary-content"
              } border-2 rounded-lg p-5 text-center cursor-pointer`}
              key={tn}
            >
              {tn}
            </div>
          ))}
        </div>
      </div>
      <div className="py-10">
        <h2 className="text-xl text-accent font-bold flex gap-2 items-center">
          {" "}
          <FaMoon /> Dark Mood{" "}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 py-5">
          {darkThemes.map((tn) => (
            <div
              onClick={() => {
                changeDarkTheme(tn);
              }}
              className={` ${
                tn == theme.dark &&
                "border-primary bg-primary text-primary-content"
              } border-2 rounded-lg p-5 text-center cursor-pointer`}
              key={tn}
            >
              {tn}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSetting;
