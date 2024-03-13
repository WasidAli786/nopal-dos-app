"use client";

import NextImage from "@/components/common/NextImage";
import ButtonUI from "@/components/common/ButtonUI";
import BannerSlider from "./BannerSlider";
import { useRouter } from "next/navigation";
import MobilePopup from "./MobilePopup";

function Banner({ configData }) {
  const router = useRouter();
  const playStoreLink = configData?.play_store_config?.link;
  const appStoreLink = configData?.play_store_config?.link;
  return (
    <>
      <BannerSlider />
      <div className="container">
        <div className="flex flex-col items-center py-10 space-y-5 md:py-16">
          <div className="w-20 h-1 bg-black dark:bg-white" />
          <h2 className="text-center primary_title">
            {configData?.restaurant_name}
          </h2>
          <ButtonUI
            size="xl"
            className="dark:text-white px-7"
            variant="bordered"
            onClick={() => router.push("/menu")}
          >
            Order Now
          </ButtonUI>
        </div>
      </div>
      <div className="relative w-full">
        <div className="relative w-full h-[400px] md:h-[600px]">
          <NextImage
            src="/images/lowerBanner.png"
            alt="lowerBanner"
            className="object-cover"
          />
        </div>
        <div className="container absolute top-0 flex flex-col items-start justify-center h-full">
          <h2 className="text-white primary_title">Catering & Events</h2>
          <h3 className="max-w-lg mt-5 font-bold text-white md:text-xl">
            Spice up your corporate and private events with Talkin' Tacos! Our
            flavorful and festive catering services bring the fiesta to your
            workplace and private events, ensuring a memorable experience for
            all your colleagues and family!
          </h3>
          <ButtonUI
            size="xl"
            variant="bordered"
            className="w-full mt-8 text-white sm:w-auto sm:px-20"
            onClick={() => router.push("/contact-us")}
          >
            Arrange Your Fiesta!
          </ButtonUI>
        </div>
      </div>
      <MobilePopup
        playStoreLink={playStoreLink}
        appStoreLink={appStoreLink}
        restaurantName={configData?.restaurant_name}
      />
    </>
  );
}

export default Banner;
