"use client";

import React, { useState } from "react";
import ModalUI from "@/components/common/ModalUI";
import ButtonUI from "@/components/common/ButtonUI";
import { useForm } from "react-hook-form";
import Services from "@/config/services";
import { errorToast, successToast } from "@/utils/toaster";
import PhoneNumberUI from "@/components/common/PhoneNumberUI";
import { baseID } from "@/config/constant";
import CheckboxUI from "@/components/common/CheckboxUI";
import Link from "next/link";

const RegisterModal = ({
  isOpen,
  onOpenChange,
  onClick,
  handleRegisterContinue,
  setPhoneNumber,
}) => {
  const { handleSubmit, control } = useForm();
  const [registerLoading, setRegisterLoading] = useState(false);
  const [termsCheckValue, setTermsCheckValue] = useState(false);

  const handleRegisterRequest = async (data) => {
    const checkPhonePayload = {
      ...data,
      restaurant_id: +baseID,
    };

    if (checkPhonePayload && !termsCheckValue) {
      return errorToast("Please accept the terms and conditions");
    }

    setRegisterLoading(true);
    try {
      const response = await Services.checkPhone(checkPhonePayload);
      if (response?.token === "active") {
        successToast("Please enter otp code sent to your number");
        setPhoneNumber(data?.phone);
        handleRegisterContinue();
      }
    } catch (error) {
      errorToast(error);
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleTermsChange = (e) => {
    setTermsCheckValue(e);
  };
  return (
    <>
      <ModalUI
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        hideCloseButton
        backdrop="blur"
      >
        <div className="py-5">
          <div className="pb-5 border-b border_lightDark">
            <h3 className="text-xl font-semibold">Join Nopal Dos</h3>
          </div>
          <form
            className="mt-10"
            onSubmit={handleSubmit(handleRegisterRequest)}
          >
            <PhoneNumberUI
              name="phone"
              label="Mobile Number"
              control={control}
              minLength={12}
              minLengthMessage="Please enter valid phone number"
            />
            <div className="flex items-center mt-5">
              <CheckboxUI
                name="check"
                control={control}
                required={false}
                onChangeProps={handleTermsChange}
              />
              <span className="text-[11px] textSecondary_lightDark font-semibold">
                By creating an account, you agree to our&nbsp;
                <Link href="/terms" className="underline text-primary">
                  terms and conditions
                </Link>
                &nbsp;and&nbsp;
                <Link href="/privacy-policy" className="underline text-primary">
                  privacy policy?
                </Link>
              </span>
            </div>
            <ButtonUI
              variant="ghost"
              size="lg"
              className="w-full mt-8 text-white"
              type="submit"
              isLoading={registerLoading}
            >
              Continue
            </ButtonUI>
          </form>
          <h6 className="mt-5 text-center textSecondary_lightDark">
            Already have an account?
            <span
              className="ml-1 cursor-pointer text-primary hover:underline"
              onClick={onClick}
            >
              Log In
            </span>
          </h6>
        </div>
      </ModalUI>
    </>
  );
};

export default RegisterModal;
