"use client";

import React, { useState } from "react";
import CartItemsCard from "@/components/modules/cart/CartItemsCard";
import OrderProductCard from "@/components/modules/menu/OrderProductCard";
import ButtonUI from "@/components/common/ButtonUI";
import { Checkbox, Chip, RadioGroup, Radio } from "@nextui-org/react";
import { cartTipData } from "@/config/data";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Services from "@/config/services";
import VerticalSkeletonCard from "@/components/common/VerticalSkeletonCard";
import { SwiperSlide } from "swiper/react";
import ReactSlider from "@/components/common/ReactSlider";
import { useStore } from "@/store/store";
import { errorToast } from "@/utils/toaster";
import EmptyData from "@/components/common/EmptyData";
import { baseID } from "@/config/constant";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getFixedValue } from "@/utils";
import InputUI from "@/components/common/InputUI";
import { useForm } from "react-hook-form";

const CartMain = () => {
  const { control } = useForm();
  const router = useRouter();
  const { getStorageItem } = useLocalStorage();
  const { user, cartItems, totalAmount, configData, setPlaceOrderPayload } =
    useStore();
  const totalCartItems = cartItems?.length;
  const taxPercentage = configData?.service_fee_estimated_tax;
  const deliveryFee = cartItems?.length ? configData?.delivery_charge : 0;
  const minOrderAmount = configData?.minimum_order_value;
  const token = getStorageItem("token");

  const [staffTipAmount, setStaffTipAmount] = useState(cartTipData[0].label);
  const [noPayStaffTipToggle, setNoPayStaffTipToggle] = useState(false);
  const [staffOtherAmount, setStaffOtherAmount] = useState(0);
  const [orderType, setOrderType] = useState("delivery");

  const { data, isLoading } = useQuery({
    queryKey: ["popularItems"],
    queryFn: Services.getAllPopularItems,
    select: (data) => data?.products,
  });

  const { data: addressListData } = useQuery({
    queryKey: ["address"],
    queryFn: Services.getAddressList,
  });

  const handleCheckout = () => {
    if (!cartItems?.length) return errorToast("Please add some items to cart");
    if (orderType === "delivery" && totalAmount < minOrderAmount)
      return errorToast(
        `Minimum amount should be ${minOrderAmount} for delivery`
      );
    setPlaceOrderPayload({
      cart: cartItems?.map((items) => {
        return {
          product_id: items?.id,
          price: items?.price,
        };
      }),
      restaurant_id: baseID,
      token: token,
      user_id: user?.id,
      coupon_discount_title: "coupon_discount_title",
      coupon_discount_amount: 0,
      order_type: orderType,
      order_tip_amount: getTipAmount(),
      total_tax_amount: getTaxAmount(),
      order_amount: getAllTotalAmount(),
    });
    if (addressListData?.length) {
      router.push("/cart/checkout");
    } else {
      router.push("/address/addNewAddress?path=cart");
    }
  };

  function getTaxAmount() {
    const taxAmount = (totalAmount * taxPercentage) / 100;
    const totalWithTax = totalAmount + taxAmount * totalCartItems;
    const finalValue = totalWithTax - totalAmount;
    return getFixedValue(finalValue);
  }

  function getTipAmount() {
    if (staffTipAmount) {
      const staffAmount =
        staffTipAmount === "Other" ? staffOtherAmount : staffTipAmount;
      const tipAmount = (totalAmount * staffAmount) / 100;
      const totalWithTip = totalAmount + tipAmount * totalCartItems;
      const finalValue = totalWithTip - totalAmount;
      return getFixedValue(finalValue);
    }
  }

  function getAllTotalAmount() {
    const allTotal =
      totalAmount +
      parseFloat(getTaxAmount()) +
      parseFloat(getTipAmount()) +
      deliveryFee;
    return getFixedValue(allTotal);
  }

  const handleAddStaffTip = (label) => {
    setStaffTipAmount(label);
  };

  const handleOrderTypeChange = (e) => {
    setOrderType(e.target.value);
  };

  const handleNoTipChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setStaffOtherAmount(0);
      setStaffTipAmount(null);
    } else {
      setStaffTipAmount(cartTipData[0].label);
    }
    setNoPayStaffTipToggle(isChecked);
  };

  const handleOtherStaffAmount = (e) => {
    setStaffOtherAmount(e.target.value);
  };
  return (
    <>
      <div className="container">
        {cartItems?.length ? (
          <div className="grid-cols-2 gap-10 mt-10 lg:grid">
            <div className="space-y-5">
              {cartItems.map((items) => (
                <CartItemsCard key={items?.id} items={items} />
              ))}
            </div>
            <div className="p-5 mt-10 rounded-2xl bgSecondary_lightDark lg:mt-0">
              <h2 className="text-2xl font-semibold text-center">
                People Also Like
              </h2>
              <div className="w-full mt-5">
                {isLoading ? (
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {[...Array(4)].map((_, index) => (
                      <VerticalSkeletonCard key={index} />
                    ))}
                  </div>
                ) : data?.length ? (
                  <ReactSlider>
                    {data?.map((items) => (
                      <SwiperSlide key={items?.id} style={{ width: "auto" }}>
                        <div className="w-40 min-w-40">
                          <OrderProductCard
                            items={items}
                            imgHeight="h-28"
                            className="bg-background"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </ReactSlider>
                ) : null}
              </div>
              <div className="flex items-center justify-between mt-6">
                <div className="w-80">
                  <InputUI
                    placeholder="Enter Promo Code"
                    size="sm"
                    control={control}
                  />
                </div>
                <ButtonUI className="px-10" size="lg">
                  Apply
                </ButtonUI>
              </div>
              <div className="mt-14">
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold">Tip the Crew</h2>
                  <div className="flex flex-wrap gap-4">
                    {cartTipData.map((items) => (
                      <Chip
                        key={items.label}
                        radius="sm"
                        className="h-12 px-4 text-xl font-semibold cursor-pointer"
                        color={
                          items.label === staffTipAmount ? "primary" : "default"
                        }
                        variant={
                          items.label === staffTipAmount ? "solid" : "bordered"
                        }
                        onClick={
                          noPayStaffTipToggle
                            ? null
                            : () => handleAddStaffTip(items.label)
                        }
                      >
                        {`${items.label}${items.label !== "Other" ? "%" : ""}`}
                      </Chip>
                    ))}
                  </div>
                  {staffTipAmount === "Other" && !noPayStaffTipToggle && (
                    <div className="max-w-60">
                      <InputUI
                        size="sm"
                        name="order_tip_amount"
                        placeholder="Staff tip amount"
                        type="number"
                        onChange={handleOtherStaffAmount}
                        startContent="$"
                        control={control}
                      />
                    </div>
                  )}
                  <Checkbox onChange={handleNoTipChange}>
                    I don’t want to pay tip.
                  </Checkbox>
                </div>
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold">Delivery Option</h2>
                  <RadioGroup
                    orientation="horizontal"
                    className="mt-2"
                    value={orderType}
                    onChange={handleOrderTypeChange}
                  >
                    <Radio value="delivery">Delivery</Radio>
                    <Radio value="pickUp">Pick up</Radio>
                  </RadioGroup>
                </div>
                <ul className="mt-10 space-y-5">
                  <li className="flex items-center justify-between text-xl font-semibold">
                    <span>Items Price</span>
                    <span>$ {getFixedValue(totalAmount)}</span>
                  </li>
                  <li className="flex items-center justify-between text-xl font-semibold">
                    <span>Fee & Estimated Tax</span>
                    <span>$ {getTaxAmount()}</span>
                  </li>
                  {!noPayStaffTipToggle && (
                    <li className="flex items-center justify-between text-xl font-semibold">
                      <span>Staff Tip</span>
                      <span>$ {getTipAmount()}</span>
                    </li>
                  )}
                  <li className="flex items-center justify-between text-xl font-semibold">
                    <span>Delivery Fee</span>
                    <span>$ {deliveryFee}</span>
                  </li>
                  <div className="border border-dashed border-primary" />
                  <li className="flex items-center justify-between text-xl font-semibold text-primary">
                    <span>Total Amount</span>
                    <span>${getAllTotalAmount()}</span>
                  </li>
                  <ButtonUI fullWidth onClick={handleCheckout}>
                    Continue Checkout
                  </ButtonUI>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <EmptyData title="Your cart is empty" className="viewport_height" />
        )}
      </div>
    </>
  );
};

export default CartMain;
