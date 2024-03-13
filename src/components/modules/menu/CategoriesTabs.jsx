"use client";

import ReactSlider from "@/components/common/ReactSlider";
import { SwiperSlide } from "swiper/react";

const CategoriesTabs = ({
  categoriesList,
  onClick,
  selectedCategory,
  swiperRef,
}) => {
  return (
    <>
      <div className="sticky z-40 bg-white border-t border-b top-20 dark:bg-dark border_lightDark">
        <ul className="container flex items-center h-14">
          <ReactSlider loop={true} swiperRef={swiperRef}>
            {categoriesList?.map((items, index) => (
              <SwiperSlide key={items?.id} style={{ width: "auto" }}>
                <li
                  className={`min-w-28 text-sm font-bold cursor-pointer text-center dark:hover:text-primary hover:text-green-700 ${
                    selectedCategory === items?.name
                      ? "text-green-700 dark:text-primary"
                      : "textSecondary_lightDark"
                  }`}
                  onClick={() => onClick(items?.name, index)}
                >
                  {items?.name}
                </li>
              </SwiperSlide>
            ))}
          </ReactSlider>
        </ul>
      </div>
    </>
  );
};

export default CategoriesTabs;
