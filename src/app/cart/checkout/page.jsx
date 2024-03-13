"use client";

import React, { useState } from "react";
import ButtonUI from "@/components/common/ButtonUI";
import ChooseStoreModal from "@/components/modules/address/ChooseStoreModal";
import PaymentCard from "@/components/modules/cart/PaymentCard";
import { HomeIcon } from "@/config/data/Icons";
import { Chip, Skeleton, Tooltip, useDisclosure } from "@nextui-org/react";
import { Plus } from "lucide-react";
import Services from "@/config/services";
import SpinnerUI from "@/components/common/SpinnerUI";
import { useQuery } from "@tanstack/react-query";
import ReactSlider from "@/components/common/ReactSlider";
import { SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import { addressPreferenceData } from "@/config/data";
import { errorToast, successToast } from "@/utils/toaster";
import { useStore } from "@/store/store";
import TextAreaUI from "@/components/common/TextAreaUI";
import EmptyData from "@/components/common/EmptyData";
import {
  getDateRange,
  getTimeAfter1AM,
  getTimeWithTwoMinInterval,
} from "@/utils/timingFunctions";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import GoogleMapUI from "@/components/common/GoogleMapUI";

const CheckoutMain = () => {
  const storeModalState = useDisclosure();
  const router = useRouter();
  const { removeStorageItem } = useLocalStorage();
  const timeTwoMinArray = getTimeWithTwoMinInterval();
  const timeAfter1AmArray = getTimeAfter1AM();
  const { placeOrderPayload, configData, resetCart } = useStore();
  const branches = configData?.branches;

  const [addressTimePreferenceType, setAddressTimePreferenceType] = useState(
    addressPreferenceData[0].label
  );
  const [addressTimePreference, setAddressTimePreference] = useState(
    timeTwoMinArray[0]
  );
  const [selectedAddressTimePreference, setSelectedAddressTimePreference] =
    useState(timeTwoMinArray);
  const [selectedAddress, setSelectedAddress] = useState();
  const [placeOrderLoading, setPlaceOrderLoading] = useState(false);
  const [orderNotValue, setOrderNotValue] = useState("");

  const handleSetAddressTimePreference = (label) => {
    setAddressTimePreferenceType(label);
    if (label === "Today") {
      setSelectedAddressTimePreference(timeTwoMinArray);
      setAddressTimePreference(timeTwoMinArray[0]);
    } else {
      setSelectedAddressTimePreference(timeAfter1AmArray);
      setAddressTimePreference(timeAfter1AmArray[0]);
    }
  };

  const handleSetCurrentAddressId = (address) => {
    setSelectedAddress(address);
  };

  const { data: cartData, isLoading: cartDataLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: Services.getCartList,
  });

  const { data: addressData, isLoading: addressDataLoading } = useQuery({
    queryKey: ["address"],
    queryFn: Services.getAddressList,
  });

  const handleRedirectAddToCart = () => {
    router.push("/cart/payment?path=/checkout");
  };

  const handleOrderPlaceRequest = async () => {
    if (!cartData?.length) return errorToast("Please add payment method");
    if (addressData?.length && !selectedAddress?.id) {
      return errorToast("Please select address");
    } else if (!addressData?.length && !selectedAddress?.id) {
      return errorToast("Please add address");
    }

    const placeOrderAllPayload = {
      ...placeOrderPayload,
      delivery_address_id: selectedAddress?.id,
      payment_method: "stripe",
      payment_id: cartData?.find((items) => items?.default_card === "1")
        ?.payment_id,
      order_note: orderNotValue,
      delivery_date:
        addressTimePreferenceType === "Today"
          ? getDateRange().currentDate
          : getDateRange().tomorrowDate,
      delivery_time: addressTimePreference,
      branch_id: configData?.branches[0]?.id,
      distance: 1,
      platform: "web",
    };
    setPlaceOrderLoading(true);
    try {
      const response = await Services.placeOrder(placeOrderAllPayload);
      if (response?.order_id) {
        successToast(response.message);
        resetCart();
        removeStorageItem("cart");
        removeStorageItem("checkoutItems");
        router.push("/menu");
      }
    } catch (error) {
      errorToast(error);
    } finally {
      setPlaceOrderLoading(false);
    }
  };
  return (
    <>
      <div className="container grid grid-cols-12 mt-10 gap-7">
        <div className="p-8 col-span-full lg:col-span-7 bgSecondary_lightDark rounded-2xl h-fit">
          <div className="relative">
            <div className="aspect-video">
              <GoogleMapUI
                lat={selectedAddress?.latitude}
                lng={selectedAddress?.longitude}
              />
            </div>
            {branches?.length > 1 && (
              <div className="absolute top-4 right-4">
                <ButtonUI size="lg" onClick={() => storeModalState.onOpen()}>
                  Choose Store
                </ButtonUI>
              </div>
            )}
          </div>
          <div className="mt-7 space-y-7">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Delivery Address</h2>
              <ButtonUI
                startContent={<Plus />}
                size="lg"
                onClick={() =>
                  router.push("/address/addNewAddress?path=checkout")
                }
              >
                Add New
              </ButtonUI>
            </div>
            <div>
              {addressDataLoading ? (
                <Skeleton className="h-20 rounded-lg" />
              ) : addressData?.length ? (
                <ReactSlider>
                  {addressData?.map((items) => (
                    <SwiperSlide key={items?.id} style={{ width: "auto" }}>
                      <div
                        className={`relative flex items-center h-20 gap-3 px-3 rounded-lg bgTertiary_lightDark w-60 cursor-pointer ${
                          items?.id === selectedAddress?.id
                            ? "border border-primary"
                            : ""
                        }`}
                        onClick={() => handleSetCurrentAddressId(items)}
                      >
                        {/* <div className="absolute top-0 right-0 h-full w-full z-10 bg-[rgba(0,0,0,0.8)] center text-center rounded-lg">
                          <span className="text-sm">
                            This address is out of coverage for this branch
                          </span>
                        </div> */}
                        <div>
                          <HomeIcon />
                        </div>
                        <div>
                          <h2 className="text-sm font-medium textSecondary_lightDark">
                            {items?.address_type}
                          </h2>
                          <Tooltip
                            content={items?.address}
                            className="max-w-60"
                          >
                            <h3 className="mt-1 text-xs line-clamp-2">
                              {items?.address}
                            </h3>
                          </Tooltip>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </ReactSlider>
              ) : (
                ""
              )}
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">Preference Time</h2>
              <div className="flex flex-wrap gap-3">
                {addressPreferenceData.slice(0, 2).map((items) => (
                  <Chip
                    key={items.label}
                    radius="sm"
                    variant={
                      addressTimePreferenceType === items.label
                        ? "solid"
                        : "bordered"
                    }
                    color={
                      addressTimePreferenceType === items.label
                        ? "primary"
                        : "default"
                    }
                    className="h-10 px-4 font-semibold cursor-pointer"
                    onClick={() => handleSetAddressTimePreference(items.label)}
                  >
                    {items.label}
                  </Chip>
                ))}
              </div>
              <ReactSlider spaceBetween={14}>
                {selectedAddressTimePreference.map((items) => (
                  <SwiperSlide key={items} style={{ width: "auto" }}>
                    <Chip
                      key={items}
                      radius="sm"
                      variant={
                        addressTimePreference === items ? "solid" : "bordered"
                      }
                      color={
                        addressTimePreference === items ? "primary" : "default"
                      }
                      className="h-10 px-4 font-semibold cursor-pointer"
                      onClick={() => setAddressTimePreference(items)}
                    >
                      {items}
                    </Chip>
                  </SwiperSlide>
                ))}
              </ReactSlider>
            </div>
          </div>
        </div>
        <div className="p-8 space-y-10 col-span-full lg:col-span-5 h-fit bgSecondary_lightDark rounded-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
              Payment Method
            </h2>
            {cartData?.length ? (
              <span
                className="cursor-pointer hover:underline"
                onClick={handleRedirectAddToCart}
              >
                Edit
              </span>
            ) : (
              <span
                className="cursor-pointer hover:underline"
                onClick={handleRedirectAddToCart}
              >
                Add Cart
              </span>
            )}
          </div>
          <div className="space-y-6">
            {cartDataLoading ? (
              <SpinnerUI />
            ) : cartData?.length ? (
              <>
                {cartData?.map((items) => {
                  if (items?.default_card === "1") {
                    return <PaymentCard key={items?.id} items={items} />;
                  }
                })}
                <TextAreaUI
                  name="order_note"
                  label="Instruction (Optional)"
                  placement="outside"
                  placeholder="Additional Instructions for delivery person. Ex. ring the bell after drop off, call upon arrival etc."
                  onChange={(e) => setOrderNotValue(e.target.value)}
                />
              </>
            ) : (
              <EmptyData
                className="min-h-0"
                title="Please add cart to continue"
              />
            )}
          </div>
          <ButtonUI
            size="lg"
            fullWidth
            onClick={handleOrderPlaceRequest}
            isLoading={placeOrderLoading}
            disabled={cartDataLoading || addressDataLoading}
          >
            Confirm Order
          </ButtonUI>
        </div>
      </div>
      <ChooseStoreModal
        isOpen={storeModalState.isOpen}
        onOpenChange={storeModalState.onOpenChange}
        onClose={storeModalState.onClose}
        branches={branches}
      />
    </>
  );
};

export default CheckoutMain;
