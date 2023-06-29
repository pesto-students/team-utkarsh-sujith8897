import { GenerateFormAi } from "./GenerateFormAi";
import { Navbar } from "./Navbar";

export const AIFormGeneratorPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 overflow-auto">
        <GenerateFormAi />
      </div>
    </div>
  );
};
