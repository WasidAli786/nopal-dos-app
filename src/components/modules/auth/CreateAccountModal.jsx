"use client";

import React, { useState } from "react";
import ModalUI from "@/components/common/ModalUI";
import ButtonUI from "@/components/common/ButtonUI";
import { useForm } from "react-hook-form";
import Services from "@/config/services";
import { errorToast, successToast } from "@/utils/toaster";
import { baseID } from "@/config/constant";
import CheckboxUI from "@/components/common/CheckboxUI";
import PhoneNumberUI from "@/components/common/PhoneNumberUI";
import Link from "next/link";
import InputUI from "@/components/common/InputUI";

const CreateAccountModal = ({
  isOpen,
  onOpenChange,
  onClose,
  showLoginModal,
  phoneNumber,
  onClick,
}) => {
  const { handleSubmit, control, setError } = useForm({
    defaultValues: {
      email_or_phone: phoneNumber,
    },
  });
  const [createAccountLoading, setCreateAccountLoading] = useState(false);
  const [termsCheckValue, setTermsCheckValue] = useState(false);

  const handleCreateAccountRequest = async (data) => {
    if (data.password !== data.c_password) {
      setError(
        "c_password",
        {
          type: "custom",
          message: "Password and confirm password must be same",
        },
        { shouldFocus: true }
      );
      return;
    }
    const createAccountPayload = {
      ...data,
      phone: phoneNumber,
      restaurant_id: +baseID,
    };

    if (createAccountPayload && !termsCheckValue) {
      return errorToast("Please accept the terms and conditions");
    }

    setCreateAccountLoading(true);
    try {
      const response = await Services.createAccount(createAccountPayload);
      if (response?.token) {
        onClose();
        showLoginModal();
        successToast("Account created successfully");
      }
    } catch (error) {
      errorToast(error);
    } finally {
      setCreateAccountLoading(false);
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
            <h3 className="text-xl font-semibold">Create Account</h3>
          </div>
          <form
            className="mt-14"
            onSubmit={handleSubmit(handleCreateAccountRequest)}
          >
            <div className="space-y-12">
              <InputUI
                name="f_name"
                label="First Name"
                placeholder="Enter first name"
                placement="outside"
                control={control}
              />
              <InputUI
                name="l_name"
                label="Last Name"
                placeholder="Enter last name"
                placement="outside"
                control={control}
              />
              <InputUI
                name="email"
                label="Email"
                placeholder="Enter email"
                placement="outside"
                control={control}
              />
            </div>
            <div className="py-5">
              <PhoneNumberUI
                name="email_or_phone"
                label="Mobile Number"
                control={control}
                minLength={12}
                minLengthMessage="Please enter valid phone number"
              />
            </div>
            <div className="space-y-12">
              <InputUI
                name="referral_code"
                label="Refer Code ( Optional )"
                placeholder="Enter refer code"
                placement="outside"
                control={control}
                required={false}
              />
              <InputUI
                name="password"
                label="Password"
                placeholder="Enter password"
                placement="outside"
                type="password"
                control={control}
                minLength={6}
                minLengthMessage="Password length must be 6"
              />
              <InputUI
                name="c_password"
                label="Confirm Password"
                placeholder="Enter confirm password"
                placement="outside"
                type="password"
                control={control}
                minLength={6}
                minLengthMessage="Password length must be 6"
              />
            </div>
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
              className="w-full mt-5 text-white"
              type="submit"
              isLoading={createAccountLoading}
            >
              Sign up
            </ButtonUI>
          </form>
          <h6 className="mt-5 text-center textSecondary_lightDark">
            Don’t have an account yet?
            <span
              className="ml-1 cursor-pointer text-primary hover:underline"
              onClick={onClick}
            >
              Sign up
            </span>
          </h6>
        </div>
      </ModalUI>
    </>
  );
};

export default CreateAccountModal;
