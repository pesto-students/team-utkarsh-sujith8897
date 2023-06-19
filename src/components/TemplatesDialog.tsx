import { customAlphabet } from "nanoid";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../config/supabase-client";
import { useBackdrop } from "../hooks/Backdrop";

const nanoid = customAlphabet(
  "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  10
);

export const TemplatesDialog = ({
  onClose = () => null,
}: {
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useBackdrop();

  const createForm = async () => {
    showLoader();
    let newFormId = nanoid(10);
    while (true) {
      const { data, error } = await supabaseClient
        .from("forms")
        .select("form_id")
        .eq("form_id", newFormId);
      if (!data || !data?.length) break;
      newFormId = nanoid(10);
    }
    hideLoader();
    navigate(`/forms/${newFormId}/edit`);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-gray-100 bg-opacity-10 backdrop-blur"
      style={{ zIndex: 1000 }}
    >
      <div className="relative space-y-6 bg-white w-100 h-100 px-6 md:px-12 py-8 rounded-md shadow-md">
        <div>
          <p className="text-center pb-2">
            Create a form in seconds using our templates
          </p>
        </div>
        <div className="flex flex-col space-y-8 justify-center md:justify-around items-center text-sm">
          <button className="w-full flex justify-center items-center space-x-2 border-2 border-gray-300 px-4 py-10 rounded-md transition-all duration-75 active:scale-95 hover:border-gray-500 text-gray-600 hover:text-black">
            <svg
              className="w-6 h-6"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="currentColor"
            >
              <path
                d="M19.4 20H4.6a.6.6 0 01-.6-.6V4.6a.6.6 0 01.6-.6h14.8a.6.6 0 01.6.6v14.8a.6.6 0 01-.6.6zM11 12V4M4 12h16"
                stroke="currentColor"
                strokeWidth="1.5"
              ></path>
            </svg>
            <p>Explore Templates</p>
          </button>
          <button
            onClick={createForm}
            className="w-full flex justify-center items-center space-x-2 border-2 border-gray-300 px-4 py-10 rounded-md transition-all duration-75 active:scale-95 hover:border-gray-500 text-gray-600 hover:text-black"
          >
            <svg
              className="w-5 h-5"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="currentColor"
            >
              <path
                d="M9 12h3m3 0h-3m0 0V9m0 3v3M21 3.6v16.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6V3.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <p>Empty Form</p>
          </button>
        </div>
        <button
          className="absolute right-2 -top-4 rounded-md p-1 text-foreground/50 opacity-100 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <line x1="18" x2="6" y1="6" y2="18"></line>
            <line x1="6" x2="18" y1="6" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};
