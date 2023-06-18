import { Link } from "react-router-dom";
import logo from "../logo.png";

export const Navbar = () => {
  return (
    <div className="sticky top-0 w-full bg-white border-b pt-6 px-4 md:px-16 lg:px-32 space-y-8">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <img src={logo} alt="logo" />
      </div>
      <div>
        <Link to="/">
          <p className="text-sm font-medium w-fit pb-2 border-b-2 border-gray-900 cursor-pointer">
            My Forms
          </p>
        </Link>
      </div>
    </div>
  );
};
