import { useEffect, useState } from "react";
import InputUI from "@/components/common/InputUI";
import MaskInputUI from "@/components/common/MaskInputUI";
import { baseID } from "@/config/constant";
import Services from "@/config/services";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useStore } from "@/store/store";
import { storeToken } from "@/utils/cookieActions";
import { errorToast, successToast } from "@/utils/toaster";
import { Spinner } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { formatPhoneNumber } from "@/utils/formatHelper";

const UserInfoForm = () => {
  const { control, setValue, setError, clearErrors } = useFormContext();
  const { setStorageItem } = useLocalStorage();
  const { user, setUser } = useStore();

  const [phoneNumber, setPhoneNumber] = useState();
  const [checkPhoneLoading, setCheckPhoneLoading] = useState(false);
  const [isCheckPhoneDisabled, setIsCheckPhoneDisabled] = useState(false);
  const [otpVerifyLoading, setOtpVerifyLoading] = useState(false);

  const onClearFieldValues = () => {
    setValue("phone", "");
    setValue("token", "");
    clearErrors("token");
    setIsCheckPhoneDisabled(false);
  };

  // *For phone verification request
  const handleSendOtpForVerificationRequest = async (phone) => {
    setPhoneNumber(phone);

    const checkPayload = {
      phone: phone,
      restaurant_id: baseID,
    };

    if (phone.length === 12 && !user?.phone) {
      setCheckPhoneLoading(true);
      try {
        const response = await Services.sendOtpForVerification(checkPayload);
        if (response?.token === "active") {
          setIsCheckPhoneDisabled(true);
          successToast("Please enter otp code sent to your number");
        }
      } catch (error) {
        errorToast(error);
        setIsCheckPhoneDisabled(false);
      } finally {
        setCheckPhoneLoading(false);
      }
    }
  };

  // *For otp verification request
  const handleVerifyUserForAuthRequest = async (otpValue) => {
    const verifyOtpPayload = {
      token: otpValue,
      phone: phoneNumber,
      restaurant_id: baseID,
    };

    if (otpValue.length === 4) {
      setOtpVerifyLoading(true);
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
        }
      } catch (error) {
        setError("token", { message: error });
      } finally {
        setOtpVerifyLoading(false);
      }
    }
  };

  //* For setting default values if have
  const setDefaultValues = (userData) => {
    setValue("f_name", userData?.f_name);
    setValue("l_name", userData?.l_name);
    setValue("email", userData?.email);
    setValue("phone", formatPhoneNumber(userData?.phone));
  };

  useEffect(() => {
    if (user?.id) {
      setDefaultValues(user);
    }
  }, [user?.id]);
  return (
    <>
      <div className="space-y-12">
        <MaskInputUI
          name="phone"
          label="Phone"
          mask="(___) ___-____"
          placeholder="(555) 555-5555"
          placement="outside"
          size="lg"
          variant="bordered"
          control={control}
          message="Please enter your contact information"
          startContent="+1"
          isPhone
          isClearable={!user?.id}
          onClear={!user?.id && onClearFieldValues}
          endContent={checkPhoneLoading && <Spinner size="sm" />}
          minLength={14}
          minLengthMessage="Please enter valid phone number"
          onMaskChange={handleSendOtpForVerificationRequest}
          disabled={checkPhoneLoading || isCheckPhoneDisabled || user?.id}
        />
        {isCheckPhoneDisabled && !user?.id && (
          <MaskInputUI
            name="token"
            label="Enter the code we sent you to use your saved info"
            mask="____"
            placeholder="0000"
            placement="outside"
            size="lg"
            variant="bordered"
            control={control}
            message="Enter the otp code"
            isClearable
            onClear={() => {
              setValue("token", "");
              clearErrors("token");
            }}
            endContent={otpVerifyLoading && <Spinner size="sm" />}
            minLength={4}
            minLengthMessage="Please enter 4 digit otp code"
            disabled={otpVerifyLoading}
            onMaskChange={handleVerifyUserForAuthRequest}
          />
        )}
      </div>
      {user?.id && (
        <div className="space-y-12">
          <div className="grid gap-5 sm:grid-cols-2">
            <InputUI
              name="f_name"
              label="First Name"
              placeholder="Enter first name"
              placement="outside"
              size="lg"
              variant="bordered"
              control={control}
              disabled={user?.f_name}
            />
            <InputUI
              name="l_name"
              label="Last Name"
              placeholder="Enter last name"
              placement="outside"
              size="lg"
              variant="bordered"
              control={control}
              disabled={user?.l_name}
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
            disabled={user?.email}
          />
        </div>
      )}
    </>
  );
};

export default UserInfoForm;
