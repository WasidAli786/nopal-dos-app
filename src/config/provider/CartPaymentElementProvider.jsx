"use client";

import getStripe from "@/utils/stripe";
import { Elements } from "@stripe/react-stripe-js";
import { useTheme } from "next-themes";
import { useStore } from "@/store/store";

const CartPaymentElementProvider = ({ children }) => {
  const { theme } = useTheme();
  const { totalAmount } = useStore();

  const appearance = {
    theme: theme === "light" ? "stripe" : "night",
    variables: {
      colorPrimary: "#06b906",
      fontFamily: '"Manrope", sans-serif',
    },
    // labels: "floating",
  };
  const options = {
    mode: "payment",
    currency: "usd",
    amount: totalAmount === 0 ? 1000 : totalAmount * 1000,
    appearance,
    paymentMethodCreation: "manual",
    payment_method_types: ["card"],
  };

  return (
    <>
      <Elements options={options} stripe={getStripe()}>
        {children}
      </Elements>
    </>
  );
};

export default CartPaymentElementProvider;
