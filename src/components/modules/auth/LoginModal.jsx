"use client";

import { Suspense, useState } from "react";
import ModalUI from "@/components/common/ModalUI";
import ButtonUI from "@/components/common/ButtonUI";
import { useForm } from "react-hook-form";
import Services from "@/config/services";
import { errorToast, successToast } from "@/utils/toaster";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useStore } from "@/store/store";
import PhoneNumberUI from "@/components/common/PhoneNumberUI";
import { useRouter, useSearchParams } from "next/navigation";
import { baseID } from "@/config/constant";
import { storeToken } from "@/utils/cookieActions";
import InputUI from "@/components/common/InputUI";

const LoginModalSuspense = ({ isOpen, onOpenChange, onClose, onClick }) => {
  const { handleSubmit, control } = useForm();
  const { setStorageItem } = useLocalStorage();
  const { setUser } = useStore();
  const router = useRouter();
  const query = useSearchParams();
  const isPrevPath = query.get("path");

  const [loginLoading, setLoginLoading] = useState(false);

  const handleLoginRequest = async (data) => {
    const loginPayload = {
      ...data,
      restaurant_id: +baseID,
    };

    setLoginLoading(true);
    try {
      const response = await Services.login(loginPayload);
      if (response?.token) {
        await storeToken(response.token);
        setStorageItem("user", response?.user);
        setStorageItem("token", response?.token);
        setUser(response.user);
        successToast("Login successfully!");
        onClose();
        if (isPrevPath) {
          router.push(isPrevPath);
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      errorToast("Invalid email or password");
    } finally {
      setLoginLoading(false);
    }
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
            <h3 className="text-xl font-semibold">Login Nopal Dos</h3>
          </div>
          <form
            className="mt-10 space-y-10"
            onSubmit={handleSubmit(handleLoginRequest)}
          >
            <PhoneNumberUI
              name="email_or_phone"
              label="Mobile Number"
              control={control}
              minLength={12}
              minLengthMessage="Please enter valid phone number"
            />
            <InputUI
              name="password"
              label="Password"
              type="password"
              placeholder="Enter password"
              placement="outside"
              control={control}
              minLength={6}
              minLengthMessage="Password length must be 6"
            />
            <ButtonUI
              variant="ghost"
              size="lg"
              className="w-full text-white"
              type="submit"
              isLoading={loginLoading}
            >
              Continue
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

export default function LoginModal() {
  return (
    <Suspense>
      <LoginModalSuspense />
    </Suspense>
  );
}
