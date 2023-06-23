import { Link } from "react-router-dom";
import logo from "../logo.png";

export const Header = () => {
  return (
    // <div
    //   className="sticky top-0 w-full bg-white border-b py-6 px-4 md:px-16 lg:px-32 space-y-8"
    //   style={{ zIndex: 10 }}
    // >
    <div className="w-full py-6">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div>
          <ul className="flex space-x-4 md:space-x-8 items-center text-sm font-semibold">
            <li>
              <Link
                to="/login"
                className="hover:bg-gray-100 px-3 py-1 rounded-md"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-black text-white px-3 py-1 rounded-md"
              >
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
