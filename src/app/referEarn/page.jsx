"use client";

import ButtonUI from "@/components/common/ButtonUI";
import NextImage from "@/components/common/NextImage";
import { useStore } from "@/store/store";
import { errorToast, successToast } from "@/utils/toaster";

const ReferEarn = () => {
  const { user } = useStore();

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      successToast("Code copied");
    } catch (error) {
      errorToast("Error copying to clipboard:");
    }
  };
  return (
    <>
      <div className="container mt-10">
        <div className="p-5 lg:p-10 rounded-2xl bgSecondary_lightDark">
          <div className="flex flex-col items-center space-y-2 text-center">
            <h1 className="primary_title">Refer and Earn</h1>
            <div className="relative w-72 h-52">
              <NextImage src="/images/refer.png" className="object-contain" />
            </div>
            <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl text-secondaryDark">
              Invite Friend and Businesses
            </h2>
            <h3 className="text-lg font-medium text-gray-400 md:text-xl lg:text-2xl">
              Copy your code, share it with your friends
            </h3>
            <p className="text-lg font-medium text-gray-500 md:text-xl">
              Your Personal Code
            </p>
          </div>
          <div className="flex flex-col items-center justify-between p-3 mt-8 border border-dashed rounded-lg sm:flex-row border_lightDark">
            <h5 className="text-xl font-medium text-secondaryDark">
              {user?.refer_code}
            </h5>
            <ButtonUI
              className="w-full mt-3 sm:w-auto sm:mt-0"
              onClick={() => copyToClipboard(user?.refer_code)}
            >
              Copy
            </ButtonUI>
          </div>
          <div className="mt-10">
            <h2 className="text-xl font-bold md:text-3xl">How you it works?</h2>
            <ul className="mt-5 space-y-5">
              <li className="flex items-center gap-5">
                <div className="h-10 text-2xl bg-gray-600 rounded-full min-w-10 center">
                  1
                </div>
                <span className="text-lg md:text-xl text-secondaryDark">
                  Invite your friends and businesses.
                </span>
              </li>
              <li className="flex items-center gap-5">
                <div className="h-10 text-2xl bg-gray-600 rounded-full min-w-10 center">
                  2
                </div>
                <span className="text-lg md:text-xl text-secondaryDark">
                  They register kasbah with special offers. Once they spend
                  their first 25$ order both of you will get 5$ coupon.
                </span>
              </li>
              <li className="flex items-center gap-5">
                <div className="h-10 text-2xl bg-gray-600 rounded-full min-w-10 center">
                  3
                </div>
                <span className="text-lg md:text-xl text-secondaryDark">
                  You made your earning!
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferEarn;
