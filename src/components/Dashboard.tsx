import { useState } from "react";
import { supabaseClient } from "../config/supabase-client";
import { Forms } from "./Forms";
import { Navbar } from "./Navbar";
import { Button } from "./ui/Button";
import { customAlphabet } from "nanoid";
import { useNavigate } from "react-router-dom";

const nanoid = customAlphabet(
  "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  10
);

export const Dashboard = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createForm = async () => {
    setIsLoading(true);
    let newFormId = nanoid(10);
    while (true) {
      const { data, error } = await supabaseClient
        .from("forms")
        .select("form_id")
        .eq("form_id", newFormId);
      if (!data || !data?.length) break;
      newFormId = nanoid(10);
    }
    setIsLoading(false);
    navigate(`/forms/${newFormId}/edit`);
  };

  return (
    <div>
      <Navbar />
      <div className="w-full bg-white border-b py-8 px-4 md:px-16 lg:px-32 space-y-8">
        <div className="flex justify-between items-center">
          <p className="text-xl">My Forms</p>
          <div>
            <Button
              text="Create Form"
              onClick={createForm}
              isLoading={isLoading}
              loadingText="Creating..."
            />
          </div>
        </div>
      </div>
      <Forms />
    </div>
  );
};
