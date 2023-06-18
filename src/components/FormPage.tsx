import { useNavigate, useParams } from "react-router-dom";
import { EFieldTypes } from "../store/type/field.type";
import { RenderForm } from "./RenderForm";
import { useEffect, useState } from "react";
import { useBackdrop } from "../hooks/Backdrop";
import { supabaseClient } from "../config/supabase-client";

export const FormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, showLoader, hideLoader } = useBackdrop();

  const [data, setData] = useState<any>({});

  const fetchData = async () => {
    showLoader();
    const { data, error } = await supabaseClient
      .from("forms")
      .select("*")
      .eq("form_id", id)
      .eq("published", true);
    if (!error) {
      if (data?.length === 0) {
        navigate("/");
      }
      setData(data?.[0]);
    }
    hideLoader();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? null : (
    <RenderForm fields={data?.fields} title={data?.name} id={data?.id} />
  );
};
