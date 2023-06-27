import { Link } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { useEffect, useRef, useState } from "react";
import { supabaseClient } from "../config/supabase-client";
import { useToast } from "../hooks/Toast";
import { useBackdrop } from "../hooks/Backdrop";

export const Navbar = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { showLoader, hideLoader } = useBackdrop();
  const popoverRef = useRef<any>(null);

  const [toggleLogout, setToggleLogout] = useState<boolean>(false);

  const handleLogout = async () => {
    showLoader();
    const { error } = await supabaseClient.auth.signOut();
    hideLoader();
    if (!error) {
      showToast("Logged out successfully!", "Thanks for the visit.");
    } else {
      showToast("Failed to logout!", "Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        popoverRef?.current &&
        !popoverRef?.current?.contains?.(event.target)
      ) {
        setToggleLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="sticky top-0 w-full bg-white border-b pt-6 px-4 md:px-16 lg:px-32 space-y-8"
      style={{ zIndex: 10 }}
    >
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src="/Logo.svg" alt="logo" />
        </Link>
        <button
          ref={popoverRef}
          className="relative px-3 py-1 bg-black text-white rounded-full shadow-md cursor-pointer"
          onClick={() => setToggleLogout((prv) => !prv)}
        >
          <div className="font-semibold">
            {user?.email?.[0]?.toUpperCase?.() || "U"}
          </div>
          {toggleLogout && (
            <div className="absolute top-10 right-0 bg-white border shadow-2xl rounded-md">
              <div
                className="text-sm text-black font-semibold px-4 py-2 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </button>
      </div>
      <div className="w-fit">
        <Link to="/">
          <p className="text-sm font-medium w-fit pb-2 border-b-2 border-gray-900 cursor-pointer">
            My Forms
          </p>
        </Link>
      </div>
    </div>
  );
};
