import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Configuration, OpenAIApi } from "openai";
import { EFieldTypes } from "../store/type/field.type";
import { updateAIFormData } from "../utils/utils";
import LoadingSpinner from "./ui/LoadingSpinner";
import { RenderForm } from "./RenderForm";
import { supabaseClient } from "../config/supabase-client";
import { useAuth } from "../hooks/Auth";
import { useToast } from "../hooks/Toast";
import { useNavigate } from "react-router-dom";

export const GenerateFormAi = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [generatedForms, setGeneratedForms] = useState<any[]>([]);
  const [selectedForm, setSelectedForm] = useState<number>(0);
  const [isLoadingSavingAIForm, setIsLoadingSavingAIForm] =
    useState<boolean>(false);

  const updateAIForms = async ({
    name = "",
    fields = [],
  }: {
    name: string;
    fields: any[];
  }) => {
    setIsLoadingSavingAIForm(true);
    const { data, error } = await supabaseClient
      .from("ai_forms")
      .insert({ user_id: user?.id, name: name, fields: fields });
    setIsLoadingSavingAIForm(false);
  };

  const handleGenerateForm = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const res: any = await openai.createChatCompletion({
      model: "gpt-4-0613",
      //   model: "gpt-3.5-turbo-0613",
      messages: [{ role: "user", content: content }],
      functions: [
        {
          name: "generate_form",
          description:
            "Generate form based on the given input and maximum number of fields should be 20",
          parameters: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "id of the form",
              },
              name: {
                type: "string",
                description: "name of the form",
              },
              description: {
                type: "string",
                description: "description of the form",
              },
              fields: {
                description: "generate form fields, should be array of objects",
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    description: "id of the form field",
                  },
                  type: {
                    type: "string",
                    enum: [
                      "text",
                      "email",
                      "number",
                      "date",
                      "file",
                      "dropdown",
                      "url",
                      "checkbox",
                      "tel",
                    ],
                    description: "type of the form field",
                  },
                  label: {
                    type: "string",
                    description: "label of the form field",
                  },
                  required: {
                    type: "boolean",
                    description: "whether form field is required or not",
                  },
                  placeholder: {
                    type: "string",
                    description: "placeholder of the form field",
                  },
                  options: {
                    type: "string",
                    description:
                      "these are options for field type checkbox and dropdown only and is string array and at least should have one option",
                  },
                  value: {
                    type: "string",
                    description:
                      "this is value property of string type for field type dropdown and string array for field type checkbox and empty array or empty string by default",
                  },
                },
              },
            },
            required: ["id", "name", "description", "fields"],
          },
        },
      ],
      function_call: {
        name: "generate_form",
      },
    });

    const args: any =
      res?.data?.choices?.[0]?.message?.function_call?.arguments;

    if (args) {
      let data = JSON?.parse?.(args);
      data = updateAIFormData(data);
      setSelectedForm(0);
      setGeneratedForms([data, ...generatedForms]);
      setIsLoading(false);
      setContent("");
      await updateAIForms({ name: data?.name, fields: data?.fields });
    } else {
      const content = res?.data?.choices?.[0]?.message?.content;
      const jsonMatch = content.match(/```json\s+({[\s\S]*?})\s+```/);
      if (jsonMatch && jsonMatch[1]) {
        const formDataString = jsonMatch[1];
        try {
          let formData = JSON.parse(formDataString);
          formData = updateAIFormData(formData);
          setSelectedForm(0);
          setGeneratedForms([formData, ...generatedForms]);
        } catch (error) {
          setIsLoading(false);
          showToast("Something Failed!", "Invalid JSON found");
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
        showToast(
          "Something Failed!",
          res?.data?.choices?.[0]?.message?.content
        );
      }
    }
  };

  const handleDeleteGeneratedForm = async (id: number) => {
    setIsLoadingData(true);
    const { data, error } = await supabaseClient
      .from("ai_forms")
      .delete()
      .eq("user_id", user?.id)
      .eq("id", id);
    if (!error) {
      await fetchGeneratedForms();
      setSelectedForm(0);
    }
    setIsLoadingData(false);
  };

  const handleUseAIGeneratedForm = () => {
    navigate(`/ai/${generatedForms[selectedForm]?.id}/edit`);
  };

  const fetchGeneratedForms = async () => {
    setIsLoadingData(true);
    const { data, error } = await supabaseClient
      .from("ai_forms")
      .select("id, name, fields")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });
    if (!error) {
      setGeneratedForms(data || []);
    }
    setIsLoadingData(false);
  };

  useEffect(() => {
    fetchGeneratedForms();
  }, []);

  return isLoadingData ? (
    <div className="w-full h-[500px] flex justify-center items-center">
      <LoadingSpinner />
    </div>
  ) : (
    <div className="w-full h-full p-4 flex space-x-0 md:space-x-4 space-y-4 md:space-y-0 flex-col md:flex-row">
      <div className="w-[25%] p-2 border-2 rounded-md flex flex-col text-sm">
        {generatedForms?.length === 0 ? (
          <div className="h-full flex justify-center items-center italic">
            No forms generated
          </div>
        ) : (
          <div className="h-full flex flex-col space-y-2">
            <p>Forms Generated</p>
            <div className="flex flex-col h-full space-y-2 overflow-auto left-panel py-1">
              {generatedForms?.map?.((form: any, index: number) => (
                <button
                  onClick={() => setSelectedForm(index)}
                  key={index}
                  className={`${
                    selectedForm === index ? "shadow" : ""
                  } bg-white border border-gray-300 w-full px-1 py-2 text-sm border relative rounded-md  hover:shadow`}
                >
                  <p className="line-clamp-1 break-words">
                    {form?.name?.length > 20
                      ? form?.name?.substr(0, 20) + "..."
                      : form?.name}
                  </p>
                  {selectedForm === index && (
                    <div
                      className="text-gray-800 hover:text-red-600"
                      onClick={() => handleDeleteGeneratedForm(form?.id)}
                    >
                      <svg
                        className="w-[14px] absolute right-3 top-3"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        color="currentColor"
                      >
                        <path
                          d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="w-[75%] p-2 border-2 rounded-md">
        <div className="h-full flex flex-col justify-between">
          <div className="max-h-full overflow-auto left-panel">
            <div className="py-4">
              {!generatedForms ? (
                <div className="text-sm flex justify-center items-center h-full">
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <p>Generate form using AI</p>
                  )}
                </div>
              ) : (
                <>
                  <div className="w-full flex justify-end px-4 py-2">
                    <button
                      disabled={isLoadingSavingAIForm}
                      onClick={handleUseAIGeneratedForm}
                      className={`${
                        isLoadingSavingAIForm
                          ? "cursor-not-allowed opacity-70"
                          : ""
                      } text-xs px-4 py-2 rounded-md bg-black text-white font-semibold transition-all duration-75 active:scale-95 focus:outline-none`}
                    >
                      {isLoadingSavingAIForm ? "Loading..." : "Use Template"}
                    </button>
                  </div>
                  <RenderForm
                    templatePreview={true}
                    fields={generatedForms[selectedForm]?.fields}
                    title={generatedForms[selectedForm]?.name}
                  />
                </>
              )}
            </div>
          </div>
          <form
            onSubmit={handleGenerateForm}
            className="flex space-x-4 items-center px-4"
          >
            <Input
              type={EFieldTypes.TEXT}
              placeholder="Ex:- Create a feedback form"
              id="content"
              name="content"
              value={content}
              onChange={(e: any) => setContent(e.target.value)}
            />
            <div className="w-[200px]">
              <Button
                text="Generate"
                loadingText="Generating..."
                isLoading={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
