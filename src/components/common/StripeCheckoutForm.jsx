import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { errorToast, successToast } from "@/utils/toaster";
import ButtonUI from "./ButtonUI";
import { useStore } from "@/store/store";

export default function StripeCheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  // const { resetCart } = useStore();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      return submitError;
    }

    setIsLoading(true);
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        elements,
        params: {
          type: "card",
        },
      });

      if (error) {
        errorToast(error);
      } else {
        console.log("Token created:", paymentMethod.id);
      }

      // const { error } = await stripe.confirmPayment({
      //   elements,
      //   confirmParams: {
      //     return_url: "http://localhost:3000/menu",
      //   },
      // });

      //  if (
      //   error.type === "card_error" ||
      //   error.type === "validation_error"
      // ) {
      //   errorToast(error.message);
      // } else {
      //   errorToast("An unexpected error occurred.");
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <ButtonUI
        fullWidth
        className="mt-8"
        size="lg"
        type="submit"
        disabled={!stripe || !elements}
        isLoading={isLoading}
      >
        Pay Now
      </ButtonUI>
    </form>
  );
}
