"use client";

import React, { Suspense } from "react";
import ModalUI from "@/components/common/ModalUI";
import ButtonUI from "@/components/common/ButtonUI";
import SelectUI from "@/components/common/SelectUI";
import { months } from "@/config/data";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Services from "@/config/services";
import { errorToast, successToast } from "@/utils/toaster";
import { useRouter, useSearchParams } from "next/navigation";
import PaymentInputUI from "@/components/common/PaymentInputUI";
import InputUI from "@/components/common/InputUI";

const PaymentCardModalSuspense = ({ isOpen, onOpenChange, onClose }) => {
  const router = useRouter();
  const query = useSearchParams();
  const isPreviousPath = query.get("path");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => {
    const yearValue = currentYear + index;
    return { label: yearValue.toString(), value: yearValue };
  });

  const { handleSubmit, control, reset } = useForm();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: Services.createCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      successToast(data.message);
      reset();
      if (isPreviousPath) {
        onClose();
        router.push("/cart/checkout");
      } else {
        onClose();
      }
    },
    onError: (data) => {
      errorToast(data);
    },
  });

  const handleCreateCart = (data) => {
    const paymentCartPayload = {
      ...data,
      card_no: data?.card_no.replace(/\s/g, ""),
    };
    mutate(paymentCartPayload);
  };

  return (
    <>
      <ModalUI
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        backdrop="blur"
      >
        <div className="py-5">
          <div className="pb-5 border-b border_lightDark">
            <h3 className="text-xl font-semibold">Add Card</h3>
          </div>
          <form
            className="mt-10 space-y-5"
            onSubmit={handleSubmit(handleCreateCart)}
          >
            <InputUI
              name="card_holder_name"
              placeholder="Card holder name"
              size="sm"
              control={control}
            />
            <PaymentInputUI
              name="card_no"
              placeholder="Card number"
              size="sm"
              control={control}
            />
            <InputUI
              name="cvc"
              placeholder="CVV"
              size="sm"
              type="number"
              control={control}
              minLength={3}
              maxLength={3}
              maxLengthMessage="CVC must be up to three numbers"
            />
            <SelectUI
              name="exp_month"
              placeholder="Expiry month"
              size="sm"
              options={months}
              control={control}
            />
            <SelectUI
              name="exp_year"
              placeholder="Expiry year"
              size="sm"
              options={years}
              control={control}
            />
            <ButtonUI
              variant="bordered"
              size="lg"
              className="w-full"
              type="submit"
              isLoading={isPending}
            >
              Save
            </ButtonUI>
          </form>
        </div>
      </ModalUI>
    </>
  );
};

export default function PaymentCardModal() {
  return (
    <Suspense>
      <PaymentCardModalSuspense />
    </Suspense>
  );
}
