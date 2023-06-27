import { formTemplates } from "../utils/utils";
import { RenderForm } from "./RenderForm";
import { Button } from "./ui/Button";

export const TemplatesPage = () => {
  return (
    <div>
      <p className="text-2xl font-bold">Templates</p>
      <div className="py-8 flex flex-wrap items-center">
        {formTemplates?.map?.((template: any, index: number) => (
          <div
            key={index}
            className="w-full md:w-[300px] lg:w-[350px] mr-0 md:mr-8 mb-8 space-y-4 px-6 py-4 border-2 rounded-md"
          >
            <div className="space-y-2">
              <p className="font-semibold">{template?.name}</p>
              <p className="text-sm">
                Collect information using {template?.name} form
              </p>
            </div>
            <div className="w-[100px]">
              <button className="bg-black text-white text-sm font-semibold px-4 py-2 rounded-md transition-all duration-75 active:scale-95 focus:outline-none">
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
