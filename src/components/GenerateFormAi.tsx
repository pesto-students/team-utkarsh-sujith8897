import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Configuration, OpenAIApi } from "openai";
import { EFieldTypes } from "../store/type/field.type";
import { getFormId, updateAIFormData } from "../utils/utils";
import LoadingSpinner from "./ui/LoadingSpinner";
import { RenderForm } from "./RenderForm";
import { supabaseClient } from "../config/supabase-client";
import { useAuth } from "../hooks/Auth";
import { useToast } from "../hooks/Toast";

export const GenerateFormAi = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const [formData, setFormData] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [generatedForms, setGeneratedForms] = useState<any[]>([]);
  const [selectedForm, setSelectedForm] = useState<number>(0);

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const updateAIForms = async ({
    name = "",
    fields = [],
  }: {
    name: string;
    fields: any[];
  }) => {
    const { data, error } = await supabaseClient
      .from("ai_forms")
      .insert({ user_id: user?.id, name: name, fields: fields });
  };

  const handleGenerateForm = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
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

  const handleUseAIForm = async () => {
    const newFormId = await getFormId();
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
    <div className="md:w-[700px] h-[300px] flex justify-center items-center">
      <LoadingSpinner />
    </div>
  ) : (
    <div className="flex space-x-0 md:space-x-4 space-y-4 md:space-y-0 flex-col md:flex-row">
      <div className="w-full md:w-[300px] flex flex-row md:flex-col max-w-[300px] border rounded-md min-h-[400px] max-h-[400px] overflow-auto left-panel">
        <div className="flex flex-col justify-between h-full px-4 py-2">
          <div className="text-sm flex flex-col space-y-2">
            <p>Forms Generated</p>
            <div className="flex flex-col space-y-2 max-h-[250px] overflow-auto left-panel py-1">
              {generatedForms?.map?.((form: any, index: number) => (
                <button
                  onClick={() => setSelectedForm(index)}
                  key={index}
                  className={`${
                    selectedForm === index ? "shadow" : ""
                  } bg-gray-100 w-full p-1 text-sm border rounded-md line-clamp-1 break-words hover:shadow`}
                >
                  {form?.name?.length > 20
                    ? form?.name?.substr(0, 20) + "..."
                    : form?.name}
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={handleGenerateForm} className="space-y-2">
            <Input
              type={EFieldTypes.TEXT}
              placeholder="Ex:- Create a feedback form"
              id="content"
              name="content"
              value={content}
              onChange={(e: any) => setContent(e.target.value)}
            />
            <div className="w-full">
              <Button
                text="Generate"
                loadingText="Generating..."
                isLoading={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="w-full md:w-[500px] max-h-[400px] overflow-y-auto left-panel pl-0 border rounded-md py-4">
        {!generatedForms ? (
          <div className="text-sm flex justify-center items-center h-full">
            {isLoading ? <LoadingSpinner /> : <p>Generate form using AI</p>}
          </div>
        ) : (
          <>
            <div className="w-full flex justify-end px-4 py-2">
              <button
                onClick={handleUseAIForm}
                className="text-xs px-4 py-2 rounded-md bg-black text-white font-semibold transition-all duration-75 active:scale-95 focus:outline-none"
              >
                Use Template
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
  );
};
