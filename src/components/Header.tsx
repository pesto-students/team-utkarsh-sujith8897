import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  const handleMobileLinkClick = () => {
    setToggleMenu(false);
  };

  return (
    <div className="w-full py-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-20 items-center">
          <Link to="/">
            <img src="/Logo.svg" alt="logo" />
          </Link>
          <div className="hidden md:block">
            <ul className="flex space-x-8 items-center">
              <li>
                <a href="#features">Features</a>
              </li>
              <li>Pricing</li>
              <li>Templates</li>
            </ul>
          </div>
        </div>
        <div>
          <ul className="hidden md:flex space-x-4 md:space-x-8 items-center font-semibold">
            <li>
              <Link
                to="/login"
                className="hover:bg-gray-200 px-4 py-2 rounded-md"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-black text-white px-4 py-2 rounded-md"
              >
                Signup
              </Link>
            </li>
          </ul>
          <div className="md:hidden relative">
            <img
              src="/hamburger.svg"
              alt="menu"
              onClick={() => setToggleMenu(true)}
            />
          </div>
        </div>
      </div>
      {toggleMenu && (
        <div
          className="fixed top-0 left-0 w-full shadow-md"
          style={{ zIndex: "10" }}
        >
          <div className="relative w-full px-8 py-12 bg-white space-y-8">
            <ul className="space-y-4 flex flex-col">
              <li>
                <a href="#features" onClick={handleMobileLinkClick}>
                  Features
                </a>
              </li>
              <li>Pricing</li>
              <li>Templates</li>
            </ul>
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="/login"
                  className="bg-gray-200 px-4 py-2 rounded-md"
                  onClick={handleMobileLinkClick}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-black text-white px-4 py-2 rounded-md"
                  onClick={handleMobileLinkClick}
                >
                  Signup
                </Link>
              </li>
            </ul>
            <div className="absolute right-6 top-0 md:hidden">
              <img
                src="/cancel.svg"
                alt="cancel"
                onClick={() => setToggleMenu(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
