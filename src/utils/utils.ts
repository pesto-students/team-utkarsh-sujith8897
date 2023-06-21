import { supabaseClient } from "../config/supabase-client";
import { EFieldTypes } from "../store/type/field.type";
import { customAlphabet } from "nanoid";


export const formTemplates = [
    {
        id: "contact-us",
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
        id: "job-application",
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
        id: "event-registration",
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
        id: "order-form",
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
        id: "support-ticket",
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
        id: "booking-form",
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

const nanoid = customAlphabet(
    "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    10
);

export const getFormId = async () => {
    let newFormId = nanoid(10);
    while (true) {
        const { data, error } = await supabaseClient
            .from("forms")
            .select("form_id")
            .eq("form_id", newFormId);
        if (!data || !data?.length) break;
        newFormId = nanoid(10);
    }
    return newFormId
}