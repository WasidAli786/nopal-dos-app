"use client";

import React, { useEffect, useState } from "react";
import ModalUI from "@/components/common/ModalUI";
import ButtonUI from "@/components/common/ButtonUI";
import NextImage from "@/components/common/NextImage";
import OtpField from "@/components/common/OtpField";
import { useForm } from "react-hook-form";
import Services from "@/config/services";
import { errorToast, successToast } from "@/utils/toaster";
import { baseID } from "@/config/constant";
import { Edit } from "lucide-react";

const VerifyPhoneModal = ({
  isOpen,
  onOpenChange,
  handleOtpVerifyForCreateAccount,
  phoneNumber,
  handleEditPhone,
}) => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm();
  const [verifyPhoneLoading, setVerifyPhoneLoading] = useState(false);
  const [otpResendLoading, setOtpResendLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handlePhoneVerifyRequest = async (data) => {
    const verifyPhonePayload = {
      ...data,
      phone: phoneNumber,
    };
    setVerifyPhoneLoading(true);
    try {
      const response = await Services.verifyPhone(verifyPhonePayload);
      if (response?.message) {
        successToast(response?.message);
        handleOtpVerifyForCreateAccount();
      }
    } catch (error) {
      errorToast("Invalid otp code");
    } finally {
      setVerifyPhoneLoading(false);
    }
  };

  const handleOtpResendRequest = async () => {
    const otpResendPayload = {
      phone: phoneNumber,
      restaurant_id: +baseID,
    };
    setOtpResendLoading(true);
    try {
      const response = await Services.checkPhone(otpResendPayload);
      if (response?.token === "active") {
        successToast("Otp resend successfully");
        setIsButtonDisabled(true);
        setOtpTimer(60);
      }
    } catch (error) {
      errorToast(error);
    } finally {
      setOtpResendLoading(false);
    }
  };

  // *For otp countdown
  useEffect(() => {
    let countdown;
    if (otpTimer > 0 && isButtonDisabled && isOpen) {
      countdown = setInterval(() => {
        setOtpTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setIsButtonDisabled(false);
      clearInterval(countdown);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [otpTimer, isButtonDisabled, isOpen]);
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
            <h3 className="text-xl font-semibold">Verify Phone</h3>
          </div>
          <form onSubmit={handleSubmit(handlePhoneVerifyRequest)}>
            <div className="flex flex-col items-center mt-10 space-y-8 text-center">
              <div className="relative w-16 h-20">
                <NextImage src="/images/verifyPhoneIcon.svg" />
              </div>
              <div>
                <h6>Please enter the 4 digit code send to</h6>
                <h6 className="gap-1 center">
                  {phoneNumber}
                  <ButtonUI
                    isIconOnly
                    variant="light"
                    color="default"
                    size="sm"
                    onClick={handleEditPhone}
                  >
                    <Edit size={16} />
                  </ButtonUI>
                </h6>
              </div>
              <OtpField name="token" control={control} />
              <div>
                {otpTimer === 0 ? (
                  <h6>I didn’t receive the code</h6>
                ) : (
                  <h6>I you didn’t receive the code in {otpTimer} seconds</h6>
                )}
                <ButtonUI
                  variant="light"
                  color="default"
                  isLoading={otpResendLoading}
                  onClick={handleOtpResendRequest}
                  disabled={isButtonDisabled}
                  className={otpTimer > 0 && "cursor-not-allowed"}
                >
                  RESEND CODE
                </ButtonUI>
              </div>
              <ButtonUI
                variant="ghost"
                size="lg"
                className="w-full text-white"
                type="submit"
                isLoading={verifyPhoneLoading}
                disabled={!isValid}
              >
                Verify
              </ButtonUI>
            </div>
          </form>
        </div>
      </ModalUI>
    </>
  );
};

export default VerifyPhoneModal;
