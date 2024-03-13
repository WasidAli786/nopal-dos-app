"use client";

import { useEffect, useRef, useState } from "react";
import ButtonUI from "@/components/common/ButtonUI";
import { Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import useImageUploadAndPreview from "@/hooks/useImageUploadAndPreview";
import Services from "@/config/services";
import { useStore } from "@/store/store";
import { errorToast, successToast } from "@/utils/toaster";
import InputUI from "@/components/common/InputUI";
import SpinnerUI from "@/components/common/SpinnerUI";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Avatar } from "@nextui-org/react";
import MaskInputUI from "@/components/common/MaskInputUI";
import { formatPhoneNumber, unFormatPhoneNumber } from "@/utils/formatHelper";
import { getUserImageBaseUrl } from "@/utils/imagesPath";

const UserProfile = () => {
  const imageRef = useRef(null);
  const userImageBaseUrl = getUserImageBaseUrl();
  const { user, setUser } = useStore();
  const { setStorageItem } = useLocalStorage();
  const { handleSubmit, setValue, control } = useForm();
  const { handleFileChange, imageUrl } = useImageUploadAndPreview();

  const [updateProfileLoading, setUpdateProfileLoading] = useState(false);

  // *For getting user info
  const getUserInfoRequest = async () => {
    try {
      const response = await Services.getUserInfo();
      if (response?.id) {
        setStorageItem("user", response);
        setUser(response);
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const handleProfileSubmit = async (data) => {
    const profilePayload = {
      ...data,
      phone: unFormatPhoneNumber(data.phone),
    };

    // if (data.password !== "" && data.password !== data.c_password) {
    //   setError(
    //     "c_password",
    //     {
    //       type: "custom",
    //       message: "Password and confirm password must be same",
    //     },
    //     { shouldFocus: true }
    //   );
    //   return;
    // }

    const formData = new FormData();
    imageUrl && formData.append("image", imageUrl);
    for (var key in profilePayload) {
      formData.append(key, profilePayload[key]);
    }

    setUpdateProfileLoading(true);
    try {
      const response = await Services.updateProfile(formData);
      if (response?.message) {
        successToast(response.message);
        getUserInfoRequest();
      }
    } catch (error) {
      errorToast(error);
    } finally {
      setUpdateProfileLoading(false);
    }
  };

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
      <div className="container mt-10">
        <div className="p-5 lg:p-10 rounded-2xl bgSecondary_lightDark">
          {!user?.id ? (
            <SpinnerUI />
          ) : (
            <div className="flex flex-col items-center">
              <div className="group relative w-[100px] h-[100px]">
                <div
                  className="absolute top-0 right-0 z-10 invisible w-full h-full rounded-full cursor-pointer center bg-black/50 group-hover:visible"
                  onClick={() => imageRef.current?.click()}
                >
                  <Camera size={30} className="textSecondary_lightDark" />
                </div>
                {imageUrl ? (
                  <Avatar
                    src={imageUrl}
                    className="object-cover w-full h-full"
                    alt={user?.f_name}
                    isBordered
                  />
                ) : (
                  <Avatar
                    isBordered
                    showFallback
                    className="object-cover w-full h-full"
                    src={`${userImageBaseUrl}${user.image}`}
                    alt={user?.f_name}
                  />
                )}
              </div>
              <input
                ref={imageRef}
                type="file"
                hidden
                onChange={handleFileChange}
              />
              {user?.f_name && (
                <h1 className="mt-5 text-2xl font-bold md:text-3xl">
                  {`${user?.f_name} ${user?.l_name}`}
                </h1>
              )}
              <form
                className="w-full mx-auto mt-10 md:mt-20"
                onSubmit={handleSubmit(handleProfileSubmit)}
              >
                <div className="grid gap-5 sm:grid-cols-2 md:gap-x-20">
                  <InputUI
                    name="f_name"
                    label="First Name"
                    placeholder="Enter first name"
                    placement="outside"
                    size="lg"
                    control={control}
                  />
                  <InputUI
                    name="l_name"
                    label="Last Name"
                    placeholder="Enter last name"
                    placement="outside"
                    size="lg"
                    control={control}
                  />
                  <InputUI
                    name="email"
                    label="Email"
                    placeholder="Enter email"
                    placement="outside"
                    size="lg"
                    disabled={user?.email}
                    control={control}
                  />
                  <MaskInputUI
                    name="phone"
                    label="Phone"
                    mask="(___) ___-____"
                    placeholder="(555) 555-5555"
                    placement="outside"
                    size="lg"
                    variant="bordered"
                    isPhone
                    disabled
                    control={control}
                    startContent="+1"
                    minLength={14}
                    minLengthMessage="Please enter valid phone number"
                  />
                  {/* <InputUI
                    name="password"
                    label="Password"
                    placeholder="Enter password"
                    placement="outside"
                    size="lg"
                    type="password"
                    control={control}
                    required={false}
                  />
                  <InputUI
                    name="c_password"
                    label="Confirm Password"
                    placeholder="Enter confirm password"
                    placement="outside"
                    size="lg"
                    type="password"
                    control={control}
                    required={false}
                  /> */}
                </div>
                <div className="flex justify-center mt-7 md:mt-14">
                  <ButtonUI
                    size="lg"
                    className="w-full md:w-fit md:px-28"
                    type="submit"
                    isLoading={updateProfileLoading}
                  >
                    Update Profile
                  </ButtonUI>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
