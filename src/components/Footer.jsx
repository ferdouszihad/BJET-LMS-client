import Logo from "./Logo";
const Footer = () => {
  return (
    <div className="footer footer-center  bg-base-200 p-2">
      <aside>
        <div>
          <Logo></Logo>
        </div>
        <p className="font-bold">LMS || A Group Project of BJET</p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </div>
  );
};

export default Footer;
