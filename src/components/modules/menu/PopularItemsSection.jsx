"use client";

import ReactSlider from "@/components/common/ReactSlider";
import { popularItemSliderSettings } from "@/config/data/sliderSettings";
import { SwiperSlide } from "swiper/react";
import PopularItemsCard from "./PopularItemsCard";
import { Navigation } from "swiper/modules";

const PopularItemsSection = ({ popularItemsList }) => {
  return (
    <>
      <ReactSlider
        className="relative mt-10"
        breakPoints={popularItemSliderSettings}
        loop={true}
        modules={[Navigation]}
        showCustomArrow
      >
        {popularItemsList?.products?.map((items, index) => (
          <SwiperSlide key={items?.id}>
            <PopularItemsCard items={items} popularCount={index + 1} />
          </SwiperSlide>
        ))}
      </ReactSlider>
    </>
  );
};

export default PopularItemsSection;
