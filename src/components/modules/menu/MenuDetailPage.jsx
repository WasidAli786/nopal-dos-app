"use client";

import { useState, useEffect } from "react";
import ButtonUI from "@/components/common/ButtonUI";
import NextImage from "@/components/common/NextImage";
import ScrollShadowUI from "@/components/common/ScrollShadowUI";
import { Radio, RadioGroup } from "@nextui-org/react";
import MenuCard from "./MenuCard";
import ReactSlider from "@/components/common/ReactSlider";
import { SwiperSlide } from "swiper/react";
import { useStore } from "@/store/store";
import { getFixedValue } from "@/utils";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import CartButton from "@/components/common/CartButton";
import { getProductImageBaseUrl } from "@/utils/imagesPath";

const MenuDetailPage = ({ recommendedBeveragesData, recommendedSidesData }) => {
  const router = useRouter();
  const productImageBaseUrl = getProductImageBaseUrl();
  const {
    addToCart,
    menuDetailQty,
    incMenuDetailQty,
    decMenuDetailQty,
    menuDetailsData,
    menuDetailAmount,
  } = useStore();
  const [addOnsValue, setAddOnsValue] = useState("");

  const handleAddItemsToCart = (data) => {
    const updatedItemWithQty = {
      ...data,
      quantity: menuDetailQty,
      choice_options: addOnsValue,
    };
    addToCart(updatedItemWithQty);
    router.push("/cart/check-out");
  };

  const handleCloseMenuDetailModal = () => {
    router.back();
  };

  const handleAddOnsValueChange = (e) => {
    setAddOnsValue(e.target.value);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  return (
    <>
      <div className="absolute top-0 right-0 z-50 flex flex-col w-full h-[calc(100vh-80px)] mb-20 overflow-y-scroll bg-background lg:flex-row">
        <ButtonUI
          isIconOnly
          color="default"
          size="sm"
          className="absolute rounded-none top-2 right-2 z-[999]"
          onClick={handleCloseMenuDetailModal}
        >
          <X />
        </ButtonUI>
        <ScrollShadowUI
          size={0}
          className="overflow-y-visible lg:overflow-y-scroll lg:h-[calc(100vh-80px)]"
        >
          <div className="max-w-full lg:max-w-lg">
            <div className="relative h-60 sm:h-72 md:h-[400px] w-full">
              <NextImage
                src={`${productImageBaseUrl}${menuDetailsData?.image}`}
                alt={menuDetailsData?.name}
                className="object-cover"
              />
            </div>
            <div className="p-5 space-y-3">
              <h1 className="text-3xl font-bold">{menuDetailsData?.name}</h1>
              <p className="textSecondary_lightDark">
                {menuDetailsData?.description}
              </p>
              <h2 className="text-2xl font-bold text-primary">
                $ {getFixedValue(menuDetailsData?.price)}
              </h2>
            </div>
          </div>
        </ScrollShadowUI>
        <ScrollShadowUI
          hideScrollBar={true}
          className="lg:h-[calc(100vh-80px)] max-w-full p-5 lg:py-10 mx-auto overflow-y-visible lg:max-w-lg lg:overflow-y-scroll"
        >
          <div className="divide-y divide_lightDark">
            {menuDetailsData?.choice_options?.length > 0 && (
              <div className="mb-5">
                <h2 className="text-xl font-semibold">(Optional) Add-ons</h2>
                <h3 className="mt-2">
                  {menuDetailsData?.choice_options[0]?.title}
                </h3>
                <RadioGroup className="mt-5" onChange={handleAddOnsValueChange}>
                  {menuDetailsData?.choice_options[0]?.options?.map((items) => (
                    <Radio value={items}>{items}</Radio>
                  ))}
                </RadioGroup>
              </div>
            )}
            <div className="py-5 space-y-5">
              <h6 className="text-lg font-semibold">Recommended Sides</h6>
              <ReactSlider>
                {recommendedSidesData?.map((items) => (
                  <SwiperSlide style={{ width: "auto" }} key={items?.id}>
                    <MenuCard items={items} />
                  </SwiperSlide>
                ))}
              </ReactSlider>
            </div>
            <div className="py-5 space-y-5">
              <h6 className="text-lg font-semibold">Recommended Beverages</h6>
              <ReactSlider>
                {recommendedBeveragesData?.map((items) => (
                  <SwiperSlide style={{ width: "auto" }} key={items?.id}>
                    <MenuCard items={items} />
                  </SwiperSlide>
                ))}
              </ReactSlider>
            </div>
          </div>
        </ScrollShadowUI>
        <div className="fixed bottom-0 flex items-center justify-end w-full h-20 gap-4 px-4 border-t border_lightDark">
          <div className="flex items-center justify-center w-full h-12 border rounded sm:w-auto border_lightDark px-7">
            <CartButton
              items={menuDetailsData}
              menuDetailQty={menuDetailQty}
              incMenuDetailQty={incMenuDetailQty}
              decMenuDetailQty={decMenuDetailQty}
            />
          </div>
          <ButtonUI
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => handleAddItemsToCart(menuDetailsData)}
          >
            Add item - ${getFixedValue(menuDetailAmount)}
          </ButtonUI>
        </div>
      </div>
    </>
  );
};

export default MenuDetailPage;
