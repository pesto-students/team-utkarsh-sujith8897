import { useEffect, useState } from "react";
import { GenerateFormAi } from "./GenerateFormAi";
import { Navbar } from "./Navbar";
import { useAuth } from "../hooks/Auth";
import { supabaseClient } from "../config/supabase-client";
import LoadingSpinner from "./ui/LoadingSpinner";
import { Button } from "./ui/Button";
import { useToast } from "../hooks/Toast";
import { PricingTabs } from "./PricingTabs";

declare global {
  interface Window {
    LemonSqueezy: any;
  }
}

export const AIFormGeneratorPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [premium, setPremium] = useState<boolean>(false);

  const handleBuy = () => {
    window?.LemonSqueezy?.Url?.Open?.(
      `${process.env.REACT_APP_PAYMENT_LINK}?checkout[custom][unique_id]=${user?.id}&checkout[email]=${user?.email}&embed=1`
    );
  };

  const fetchData = async () => {
    setIsLoading(true);

    const { data, error }: any = await supabaseClient
      .from("premium_users")
      .select("id, user_id, type")
      .eq("user_id", user?.id);

    if (data?.length > 0) {
      setPremium(true);
    }

    setIsLoading(false);
  };

  const updatePremiumUser = async (order_number: number) => {
    const { data, error }: any = await supabaseClient
      .from("premium_users")
      .insert({
        user_id: user?.id,
        order_number,
        type: "lifetime",
      });
    if (!error) {
      setPremium(true);
      showToast(
        "Successfully purchased",
        "Now you can generate forms using Form AI"
      );
    }
  };

  const handleCheckoutSuccess = async (order_number: number) => {
    await updatePremiumUser(order_number);
    window?.LemonSqueezy?.Url?.Close?.();
  };

  window?.LemonSqueezy?.Setup?.({
    eventHandler: (event: any) => {
      // console.log({ event });
      if (event.event === "Checkout.Success") {
        const order_number = event?.data?.order?.data?.attributes?.order_number;
        handleCheckoutSuccess(order_number);
      }
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`flex flex-col ${premium ? "h-screen" : "h-full"}`}>
      <Navbar />
      {premium ? (
        <div className="flex-1 overflow-auto">
          <GenerateFormAi />
        </div>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          {isLoading ? (
            <div className="min-h-[500px] flex justify-center items-center">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="h-full pt-8">
              {/* <Button
                text="Buy Premium"
                onClick={handleBuy}
                isLoading={!window?.LemonSqueezy}
              /> */}
              <PricingTabs handlePayment={handleBuy} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
