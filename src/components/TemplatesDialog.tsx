import { customAlphabet } from "nanoid";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../config/supabase-client";
import { useBackdrop } from "../hooks/Backdrop";
import { useState } from "react";
import { RenderForm } from "./RenderForm";
import { EFieldTypes } from "../store/type/field.type";

const nanoid = customAlphabet(
  "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  10
);

const formTemplates = [
  {
    id: "contactUs",
    name: "Contact Us",
    fields: [
      {
        id: "text",
        type: EFieldTypes.TEXT,
        label: "Name",
        required: true,
        placeholder: "Your Name",
      },
      {
        id: "email",
        type: EFieldTypes.EMAIL,
        label: "Email",
        required: true,
        placeholder: "name@example.com",
      },
      {
        id: "tel",
        type: EFieldTypes.PHONE,
        label: "Phone Number",
        required: false,
        placeholder: "123-456-7890",
      },
      {
        id: "text",
        type: EFieldTypes.TEXT,
        label: "Subject",
        required: true,
        placeholder: "Subject",
      },
      {
        id: "text",
        type: EFieldTypes.TEXT,
        label: "Message",
        required: true,
        placeholder: "Your message...",
      },
    ],
  },
  {
    id: "feedback",
    name: "Feedback",
    fields: [
      {
        id: "text",
        type: EFieldTypes.TEXT,
        label: "Name",
        required: true,
        placeholder: "Your Name",
      },
      {
        id: "email",
        type: EFieldTypes.EMAIL,
        label: "Email",
        required: true,
        placeholder: "name@example.com",
      },
      {
        id: "dropdown",
        type: EFieldTypes.DROPDOWN,
        label: "Rating",
        options: ["1", "2", "3", "4", "5"],
        value: "",
        required: true,
        placeholder: "Select Rating",
      },
      {
        id: "text",
        type: EFieldTypes.TEXT,
        label: "Feedback",
        required: true,
        placeholder: "Your feedback...",
      },
    ],
  },
  {
    id: "jobApplication",
    name: "Job Application",
    fields: [
      {
        id: "text",
        type: EFieldTypes.TEXT,
        label: "Name",
        required: true,
        placeholder: "Your Name",
      },
      {
        id: "email",
        type: EFieldTypes.EMAIL,
        label: "Email",
        required: true,
        placeholder: "name@example.com",
      },
      {
        id: "tel",
        type: EFieldTypes.PHONE,
        label: "Phone Number",
        required: true,
        placeholder: "123-456-7890",
      },
      {
        id: "file",
        type: EFieldTypes.FILE,
        label: "Resume",
        required: true,
        placeholder: "Upload your resume",
      },
      {
        id: "text",
        type: EFieldTypes.TEXT,
        label: "Cover Letter",
        required: false,
        placeholder: "Enter your cover letter",
      },
    ],
  },
  {
    id: "eventRegistration",
    name: "Event Registration",
    fields: [
      {
        id: "text",
        type: EFieldTypes.TEXT,
        label: "Name",
        required: true,
        placeholder: "Your Name",
      },
      {
        id: "email",
        type: EFieldTypes.EMAIL,
        label: "Email",
        required: true,
        placeholder: "name@example.com",
      },
      {
        id: "tel",
        type: EFieldTypes.PHONE,
        label: "Phone Number",
        required: true,
        placeholder: "123-456-7890",
      },
      {
        id: "number",
        type: EFieldTypes.NUMBER,
        label: "Number of Tickets",
        required: true,
        placeholder: "1",
      },
      {
        id: "checkbox",
        type: EFieldTypes.CHECKBOX,
        label: "Dietary Preferences",
        options: ["Vegetarian", "Vegan", "Gluten-free"],
        value: [],
        required: false,
      },
    ],
  },
  {
    id: "survey",
    name: "Customer Survey",
    fields: [
      {
        id: "dropdown",
        type: EFieldTypes.DROPDOWN,
        label: "How satisfied are you with our service?",
        options: [
          "Very Satisfied",
          "Satisfied",
          "Neutral",
          "Dissatisfied",
          "Very Dissatisfied",
        ],
        value: "",
        required: true,
      },
      {
        id: "text",
        type: EFieldTypes.TEXT,
        label: "Comments",
        required: false,
        placeholder: "Additional comments...",
      },
    ],
  },
  {
    id: "orderForm",
    name: "Product Order Form",
    fields: [
      {
        id: "text",
        type: EFieldTypes.TEXT,
        label: "Full Name",
        required: true,
        placeholder: "Your Name",
      },
      {
        id: "email",
        type: EFieldTypes.EMAIL,
        label: "Email",
        required: true,
        placeholder: "name@example.com",
      },
      {
        id: "tel",
        type: EFieldTypes.PHONE,
        label: "Phone Number",
        required: true,
        placeholder: "123-456-7890",
      },
      {
        id: "text",
        type: EFieldTypes.TEXT,
        label: "Shipping Address",
        required: true,
        placeholder: "Your shipping address",
      },
      {
        id: "dropdown",
        type: EFieldTypes.DROPDOWN,
        label: "Product",
        options: ["Product 1", "Product 2", "Product 3"],
        value: "",
        required: true,
      },
      {
        id: "number",
        type: EFieldTypes.NUMBER,
        label: "Quantity",
        required: true,
        placeholder: "1",
      },
    ],
  },
  {
    id: "newsletter",
    name: "Newsletter Subscription",
    fields: [
      {
        id: "email",
        type: EFieldTypes.EMAIL,
        label: "Email",
        required: true,
        placeholder: "name@example.com",
      },
    ],
  },
  {
    id: "quiz",
    name: "Quiz Form",
    fields: [
      {
        id: "text",
        type: EFieldTypes.TEXT,
        label: "Name",
        required: true,
        placeholder: "Your Name",
      },
      {
        id: "email",
        type: EFieldTypes.EMAIL,
        label: "Email",
        required: true,
        placeholder: "name@example.com",
      },
      {
        id: "dropdown",
        type: EFieldTypes.DROPDOWN,
        label: "Question 1",
        options: ["Option 1", "Option 2", "Option 3"],
        value: "",
        required: true,
      },
      {
        id: "dropdown",
        type: EFieldTypes.DROPDOWN,
        label: "Question 2",
        options: ["Option 1", "Option 2", "Option 3"],
        value: "",
        required: true,
      },
      {
        id: "dropdown",
        type: EFieldTypes.DROPDOWN,
        label: "Question 3",
        options: ["Option 1", "Option 2", "Option 3"],
        value: "",
        required: true,
      },
    ],
  },
  {
    id: "supportTicket",
    name: "Support Ticket",
    fields: [
      {
        id: "text",
        type: EFieldTypes.TEXT,
        label: "Name",
        required: true,
        placeholder: "Your Name",
      },
      {
        id: "email",
        type: EFieldTypes.EMAIL,
        label: "Email",
        required: true,
        placeholder: "name@example.com",
      },
      {
        id: "text",
        type: EFieldTypes.TEXT,
        label: "Issue",
        required: true,
        placeholder: "Describe your issue",
      },
    ],
  },
  {
    id: "bookingForm",
    name: "Appointment Booking",
    fields: [
      {
        id: "text",
        type: EFieldTypes.TEXT,
        label: "Name",
        required: true,
        placeholder: "Your Name",
      },
      {
        id: "email",
        type: EFieldTypes.EMAIL,
        label: "Email",
        required: true,
        placeholder: "name@example.com",
      },
      {
        id: "tel",
        type: EFieldTypes.PHONE,
        label: "Phone Number",
        required: true,
        placeholder: "123-456-7890",
      },
      {
        id: "date",
        type: EFieldTypes.DATE,
        label: "Date",
        required: true,
        placeholder: "Select a date",
      },
      {
        id: "text",
        type: EFieldTypes.TEXT,
        label: "Message",
        required: false,
        placeholder: "Additional info",
      },
    ],
  },
];

export const TemplatesDialog = ({
  onClose = () => null,
}: {
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useBackdrop();

  const [templates, setTemplates] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number>(0);

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
      className={`fixed top-0 left-0 w-full h-full z-50 flex justify-center ${
        templates ? "" : "items-center"
      } md:items-center bg-gray-100 bg-opacity-10 backdrop-blur`}
      style={{ zIndex: 1000 }}
    >
      <div className="relative bg-white m-4 border-2 px-6 md:px-8 py-8 rounded-md shadow-md overflow-auto">
        <div>
          <p className="text-center pb-2">
            Create a form in seconds using our templates
          </p>
        </div>
        {templates ? (
          <div>
            <div className="mt-4 mb-6">
              <img
                onClick={() => setTemplates(false)}
                src="/arrow-left.svg"
                alt="arrow-left-icon"
                className="w-5 h-5 cursor-pointer transition-all duration-75 active:scale-90"
              />
            </div>
            <div className="flex space-x-0 md:space-x-4 space-y-4 md:space-y-0 flex-col md:flex-row">
              <div className="w-full md:w-[300px] flex flex-row md:flex-col max-w-[300px] border rounded-md max-h-[400px] overflow-auto left-panel">
                {formTemplates?.map?.((template: any, index: number) => (
                  <button
                    onClick={() => setSelectedTemplate(index)}
                    key={index}
                    className={`${
                      selectedTemplate === index ? "bg-gray-50 font-medium" : ""
                    } w-[100%] p-2 border-r md:border-b text-sm hover:bg-gray-50`}
                  >
                    {template?.name}
                  </button>
                ))}
              </div>
              <div className="w-full md:w-[500px] max-h-[400px] overflow-y-auto left-panel pl-0 border rounded-md py-4">
                <RenderForm
                  templatePreview={true}
                  fields={formTemplates[selectedTemplate]?.fields}
                  title={formTemplates[selectedTemplate]?.name}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-col space-y-8 justify-center md:justify-around items-center text-sm">
            <button
              onClick={() => setTemplates(true)}
              className="w-full flex justify-center items-center space-x-2 border-2 border-gray-300 px-4 py-10 rounded-md transition-all duration-75 active:scale-95 hover:border-gray-500 text-gray-600 hover:text-black"
            >
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
        )}
        <button
          className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-100 transition-opacity"
          onClick={onClose}
        >
          <svg
            className="w-5 h-5 text-gray-700"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 9L15 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 9L9 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
