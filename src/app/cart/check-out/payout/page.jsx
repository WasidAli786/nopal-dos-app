"use client";

import StripeCheckoutForm from "@/components/common/StripeCheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useTheme } from "next-themes";
import getStripe from "@/utils/stripe";

const Payout = () => {
  const { theme } = useTheme();

  const appearance = {
    theme: theme === "light" ? "stripe" : "night",
    // labels: "floating",
  };
  const options = {
    mode: "payment",
    currency: "usd",
    amount: 1099,
    appearance,
    paymentMethodCreation: "manual",
  };

  return (
    <>
      <div className="container py-10">
        <div className="max-w-2xl p-8 mx-auto shadow-xl rounded-xl bgSecondary_lightDark">
          <h2 className="mb-8 text-2xl font-bold">
            Enter payment info to complete the order
          </h2>
          <Elements options={options} stripe={getStripe()}>
            <StripeCheckoutForm />
          </Elements>
        </div>
      </div>
    </>
  );
};

export default Payout;
