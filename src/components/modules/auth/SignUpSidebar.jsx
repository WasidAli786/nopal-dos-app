"use client";

import ScrollShadowUI from "@/components/common/ScrollShadowUI";
import MaskInputUI from "@/components/common/MaskInputUI";
import { useForm } from "react-hook-form";
import ButtonUI from "@/components/common/ButtonUI";
import { Gift, Star, TicketPercent, X } from "lucide-react";
import InputUI from "@/components/common/InputUI";
import Link from "next/link";
import Services from "@/config/services";
import { Spinner } from "@nextui-org/react";
import { Suspense, useEffect, useState } from "react";
import { baseID } from "@/config/constant";
import { useStore } from "@/store/store";
import { errorToast, successToast } from "@/utils/toaster";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter, useSearchParams } from "next/navigation";
import { storeToken } from "@/utils/cookieActions";
import DrawerUI from "@/components/common/DrawerUI";

const SignUpSidebarSuspense = ({ isAuthSidebarOpen, setIsAuthSidebarOpen }) => {
  const { user, setUser } = useStore();
  const { handleSubmit, setError, setValue, control, reset } = useForm();
  const { setStorageItem } = useLocalStorage();
  const router = useRouter();
  const query = useSearchParams();
  const isPreviousPath = query.get("path");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [sendOtpLoading, setSendOtpLoading] = useState(false);
  const [verifyUserLoading, setVerifyUserLoading] = useState(false);
  const [isCheckPhoneDisabled, setIsCheckPhoneDisabled] = useState(false);
  const [isAlreadyUserExists, setIsAlreadyUserExists] = useState(true);
  const [resendCodeToggle, setResendCodeToggle] = useState(true);

  // *For phone verification request
  const handleSendOtpForVerificationRequest = async (phone) => {
    setPhoneNumber(phone);

    const checkPayload = {
      phone,
      restaurant_id: baseID,
    };

    if (phone.length === 12 && !user?.phone) {
      setSendOtpLoading(true);
      try {
        const response = await Services.sendOtpForVerification(checkPayload);
        if (response?.token === "active") {
          setIsCheckPhoneDisabled(true);
          setIsAlreadyUserExists(response?.user_exists);
          successToast("Please enter otp code sent to your number");
        }
      } catch (error) {
        errorToast(error);
        setIsCheckPhoneDisabled(false);
      } finally {
        setSendOtpLoading(false);
      }
    }
  };

  // *For otp verification request
  const handleVerifyUserForAuthRequest = async (data) => {
    const isObjectData = typeof data === "object" && data !== null;

    let verifyOtpPayload;
    if (isObjectData) {
      verifyOtpPayload = {
        token: data.token,
        phone: phoneNumber,
        f_name: data.f_name,
        l_name: data.l_name,
        email: data.email,
        restaurant_id: baseID,
      };
    } else {
      verifyOtpPayload = {
        token: data,
        phone: phoneNumber,
        restaurant_id: baseID,
      };
    }

    if (isObjectData ? data.token : data.length === 4) {
      setVerifyUserLoading(true);
      try {
        const response = await Services.verifyUserForAuthentication(
          verifyOtpPayload
        );
        if (response?.token) {
          await storeToken(response.token);
          setStorageItem("user", response?.user);
          setStorageItem("token", response?.token);
          setUser(response.user);
          successToast("Otp verified");
          setIsCheckPhoneDisabled(true);
          setIsAuthSidebarOpen(false);
          reset();
          if (isPreviousPath) {
            router.push(isPreviousPath);
          }
        }
      } catch (error) {
        setError("token", { message: error[0]?.message });
      } finally {
        setVerifyUserLoading(false);
      }
    }
  };

  const handleSignUpRequest = (data) => {
    handleVerifyUserForAuthRequest(data);
  };

  const handleResendOtp = () => {
    handleSendOtpForVerificationRequest(phoneNumber);
    setResendCodeToggle(false);
  };

  const onClearFieldValues = () => {
    setPhoneNumber("");
    setIsCheckPhoneDisabled(false);
    setIsAlreadyUserExists(true);
    setResendCodeToggle(true);
    reset({
      phone: "",
      token: "",
      f_name: "",
      l_name: "",
      email: "",
    });
  };

  const handleAuthToggle = () => {
    setIsAlreadyUserExists(!isAlreadyUserExists);
    reset({ phone: "", token: "" });
  };

  const handleCloseAuthSidebar = () => {
    setIsAuthSidebarOpen(false);
  };

  useEffect(() => {
    if (isPreviousPath) {
      setIsAuthSidebarOpen(true);
    }
  }, [isPreviousPath]);
  return (
    <>
      <DrawerUI isOpen={isAuthSidebarOpen} onClose={setIsAuthSidebarOpen}>
        <div className="flex flex-col justify-between h-full">
          <ScrollShadowUI>
            <div className="h-auto p-6 divide-y divide_lightDark">
              <div className="flex items-center justify-between gap-5 pb-6">
                <h6 className="font-semibold">
                  Login or Signup for Nopal Dos Rewards, Win $500!
                </h6>
                <ButtonUI
                  color="default"
                  isIconOnly
                  onClick={handleCloseAuthSidebar}
                >
                  <X />
                </ButtonUI>
              </div>
              <div className="py-6">
                <div className="space-y-12">
                  <div>
                    <MaskInputUI
                      name="phone"
                      label="Phone"
                      mask="(___) ___-____"
                      placeholder="(555) 555-5555"
                      placement="outside"
                      size="lg"
                      isPhone
                      variant="bordered"
                      control={control}
                      startContent="+1"
                      isClearable
                      onClear={onClearFieldValues}
                      endContent={sendOtpLoading && <Spinner size="sm" />}
                      minLength={14}
                      minLengthMessage="Please enter valid phone number"
                      onMaskChange={handleSendOtpForVerificationRequest}
                      disabled={sendOtpLoading || isCheckPhoneDisabled}
                    />
                    {!isCheckPhoneDisabled ? (
                      !isAlreadyUserExists ? (
                        <div className="mt-2 text-sm textSecondary_lightDark">
                          Already have an account?
                          <span
                            className="ml-1 text-base font-bold underline cursor-pointer"
                            onClick={handleAuthToggle}
                          >
                            Login
                          </span>
                        </div>
                      ) : (
                        <div className="mt-2 text-sm textSecondary_lightDark">
                          Don't have an account yet?
                          <span
                            className="ml-1 text-base font-bold underline cursor-pointer"
                            onClick={handleAuthToggle}
                          >
                            Sign Up
                          </span>
                        </div>
                      )
                    ) : null}
                  </div>
                  <div>
                    <MaskInputUI
                      name="token"
                      label="Enter the code we sent you"
                      mask="____"
                      placeholder="0000"
                      placement="outside"
                      size="lg"
                      variant="bordered"
                      control={control}
                      isClearable
                      onClear={() => setValue("token", "")}
                      endContent={verifyUserLoading && <Spinner size="sm" />}
                      minLength={4}
                      minLengthMessage="Please enter 4 digit opt code"
                      disabled={!isCheckPhoneDisabled || verifyUserLoading}
                      onMaskChange={
                        !isAlreadyUserExists
                          ? null
                          : handleVerifyUserForAuthRequest
                      }
                    />
                    {isCheckPhoneDisabled && (
                      <div className="mt-2 text-sm textSecondary_lightDark">
                        A one-time verification code was sent to your phone and
                        should arrive shortly.{" "}
                        {resendCodeToggle
                          ? "Didn't receive a code yet?"
                          : "Code sent!"}
                        {resendCodeToggle && (
                          <div
                            className="text-base font-bold underline cursor-pointer text-primary w-fit"
                            onClick={handleResendOtp}
                          >
                            Resend verification code
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {!isAlreadyUserExists && (
                  <div className="mt-6 space-y-12">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <InputUI
                        name="f_name"
                        label="First Name"
                        placeholder="Enter first name"
                        placement="outside"
                        size="lg"
                        variant="bordered"
                        control={control}
                      />
                      <InputUI
                        name="l_name"
                        label="Last Name"
                        placeholder="Enter last name"
                        placement="outside"
                        size="lg"
                        variant="bordered"
                        control={control}
                      />
                    </div>
                    <InputUI
                      name="email"
                      label="Email"
                      placeholder="Enter email"
                      placement="outside"
                      size="lg"
                      variant="bordered"
                      control={control}
                    />
                  </div>
                )}
              </div>
            </div>
          </ScrollShadowUI>
          <div className="w-full p-6 space-y-4 border-t bgSecondary_lightDark border_lightDark">
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col items-center space-y-2 text-center">
                <Star size={20} />
                <span className="text-xs sm:text-sm">
                  Earn points with every order
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <Gift size={20} />
                <span className="text-xs sm:text-sm">
                  Redeem points for free food
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <TicketPercent size={20} />
                <span className="text-xs sm:text-sm">
                  Receive exclusive discounts
                </span>
              </div>
            </div>
            <ButtonUI
              fullWidth
              onClick={handleSubmit(handleSignUpRequest)}
              isLoading={verifyUserLoading && !isAlreadyUserExists}
            >
              {isAlreadyUserExists ? "Continue" : "Sign Up"}
            </ButtonUI>
            <div className="mt-5 text-sm">
              By signing up, you agree to our Platform&nbsp;
              <Link
                href="/terms"
                className="underline text-primary"
                onClick={handleCloseAuthSidebar}
              >
                Terms & Conditions
              </Link>
              &nbsp;and&nbsp;
              <Link
                href="/privacy-policy"
                className="underline text-primary"
                onClick={handleCloseAuthSidebar}
              >
                privacy policy?
              </Link>
            </div>
          </div>
        </div>
      </DrawerUI>
    </>
  );
};

export default function SignUpSidebar() {
  return (
    <Suspense>
      <SignUpSidebarSuspense />
    </Suspense>
  );
}
