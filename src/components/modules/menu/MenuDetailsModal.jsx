"use client";

import React, { useEffect, useState } from "react";
import ModalUI from "@/components/common/ModalUI";
import NextImage from "@/components/common/NextImage";
import ButtonUI from "@/components/common/ButtonUI";
import { X } from "lucide-react";
import CartButton from "@/components/common/CartButton";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import ScrollShadowUI from "@/components/common/ScrollShadowUI";
import { getFixedValue } from "@/utils";
import { Checkbox, CheckboxGroup, Chip } from "@nextui-org/react";
import AddOnsOption from "./AddOnsOption";
import { useForm } from "react-hook-form";
import ReactSlider from "@/components/common/ReactSlider";
import { SwiperSlide } from "swiper/react";
import MenuCard from "./MenuCard";
import { getProductImageBaseUrl } from "@/utils/imagesPath";

const MenuDetailsModal = ({
  recommendedBeveragesData,
  recommendedSidesData,
}) => {
  const { control, handleSubmit } = useForm();
  const productImageBaseUrl = getProductImageBaseUrl();
  const {
    addToCart,
    menuDetailQty,
    incMenuDetailQty,
    decMenuDetailQty,
    menuDetailsData,
    menuDetailAmount,
  } = useStore();

  const router = useRouter();

  const [removalOptions, setRemovalOptions] = useState([]);

  const handleAddItemsToCart = (menuData) => (formData) => {
    const updatedItemWithQty = {
      ...menuData,
      quantity: menuDetailQty,
      choice_options: formData?.choice_options,
      removal_options: removalOptions,
    };
    addToCart(updatedItemWithQty);
    router.back();
  };

  const onOptionRemovalChange = (e) => {
    setRemovalOptions(e);
  };

  const handleCloseMenuDetailModal = () => {
    router.back();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <>
      <ModalUI
        isOpen={true}
        hideCloseButton={true}
        noPadding
        size="full"
        scrollBehavior="inside"
        footerContent={
          <div className="flex items-center justify-end w-full gap-4">
            <div className="flex items-center justify-center h-12 px-6 border rounded border_lightDark">
              <CartButton
                items={menuDetailsData}
                menuDetailQty={menuDetailQty}
                incMenuDetailQty={incMenuDetailQty}
                decMenuDetailQty={decMenuDetailQty}
              />
            </div>
            <ButtonUI
              size="lg"
              onClick={handleSubmit(handleAddItemsToCart(menuDetailsData))}
            >
              Add item - ${getFixedValue(menuDetailAmount)}
            </ButtonUI>
          </div>
        }
      >
        <ButtonUI
          isIconOnly
          color="default"
          size="sm"
          className="absolute z-50 rounded-none top-2 right-6"
          onClick={handleCloseMenuDetailModal}
        >
          <X />
        </ButtonUI>
        <div className="flex flex-col lg:flex-row">
          <ScrollShadowUI className="lg:h-[calc(100vh-80px)] lg:sticky left-0 top-0 overflow-x-hidden">
            <div className="w-full lg:w-[500px]">
              <div className="relative h-60 sm:h-72 md:h-80 lg:h-[500px] w-full">
                <NextImage
                  src={`${productImageBaseUrl}${menuDetailsData?.image}`}
                  alt={menuDetailsData?.name}
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h1 className="text-2xl font-bold md:text-3xl">
                  {menuDetailsData?.name}
                </h1>
                <p className="mt-2 textSecondary_lightDark">
                  {menuDetailsData?.description}
                </p>
                <h2 className="mt-4 text-xl font-bold md:text-2xl text-primary">
                  $ {getFixedValue(menuDetailsData?.price)}
                </h2>
              </div>
            </div>
          </ScrollShadowUI>
          <div className="w-full lg:w-[500px] mx-auto px-5 lg:py-10">
            {menuDetailsData?.choice_options?.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-semibold">Add-ons</h4>
                  <Chip color="primary">Required</Chip>
                </div>
                <h4 className="textSecondary_lightDark">
                  {menuDetailsData?.choice_options[0]?.title}
                </h4>
                <div className="mt-4">
                  <AddOnsOption
                    name="choice_options"
                    radioOptions={menuDetailsData?.choice_options[0]?.options}
                    control={control}
                  />
                </div>
              </div>
            )}
            {menuDetailsData?.removal_options?.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-semibold">Removal Option</h4>
                  <Chip color="default">Optional</Chip>
                </div>
                <h4 className="textSecondary_lightDark">
                  {menuDetailsData?.removal_options[0]?.title}
                </h4>
                <div className="mt-4">
                  <CheckboxGroup onValueChange={onOptionRemovalChange}>
                    <div className="divide-y divide_lightDark">
                      {menuDetailsData?.removal_options[0]?.options?.map(
                        (items) => (
                          <Checkbox
                            value={items}
                            classNames={{
                              base: "max-w-full m-0 flex items-center flex-row-reverse py-4",
                              label: "w-full",
                            }}
                            key={items}
                          >
                            {items}
                          </Checkbox>
                        )
                      )}
                    </div>
                  </CheckboxGroup>
                </div>
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
        </div>
      </ModalUI>
    </>
  );
};

export default MenuDetailsModal;
