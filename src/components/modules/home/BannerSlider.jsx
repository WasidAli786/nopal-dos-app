"use client";

import { SwiperSlide } from "swiper/react";
import { EffectFade, Pagination } from "swiper/modules";
import ButtonUI from "@/components/common/ButtonUI";
import NextImage from "@/components/common/NextImage";
import { bannerData } from "@/config/data";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import ReactSlider from "@/components/common/ReactSlider";

const BannerSlider = () => {
  const { user } = useStore();
  const router = useRouter();
  return (
    <>
      <ReactSlider
        pagination={{
          clickable: true,
        }}
        loop={true}
        effect={"fade"}
        modules={[EffectFade, Pagination]}
      >
        {bannerData?.map((items, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full">
              <div
                className={`relative w-full h-96 sm:h-[500px] ${
                  user?.id
                    ? "md:h-[calc(100vh-80px)]"
                    : "md:h-[calc(100vh-120px)]"
                }`}
              >
                <NextImage
                  src={items.image}
                  alt="banner"
                  className="object-cover"
                />
              </div>
              <div className="absolute top-0 flex flex-col justify-center w-full h-full bg-black/60">
                <div className="container">
                  <div className="space-y-5">
                    <div className="w-20 h-1 bg-white" />
                    <h1 className="text-white primary_title">
                      Unforgettable Taco
                      <br />
                      Bliss
                    </h1>
                    <h3 className="text-lg font-bold text-white">
                      Best Tacos in America
                    </h3>
                    <div className="flex gap-4">
                      <ButtonUI
                        size="xl"
                        className="w-full px-8 sm:w-auto"
                        onClick={() => router.push("/menu")}
                      >
                        Order Now
                      </ButtonUI>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </ReactSlider>
    </>
  );
};

export default BannerSlider;
