import ButtonUI from "@/components/common/ButtonUI";
import ScrollShadowUI from "@/components/common/ScrollShadowUI";
import { RadioGroup, Radio } from "@nextui-org/react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { useStore } from "@/store/store";
import DeliveryDropdown from "./DeliveryDropdown";
import DeliveryInfoForm from "./DeliveryInfoForm";
import UserInfoForm from "./UserInfoForm";
import TipSection from "./TipSection";
import InputUI from "@/components/common/InputUI";
import PrivacyLinks from "@/components/layout/PrivacyLinks";
import Link from "next/link";
import { PaymentElement } from "@stripe/react-stripe-js";

const FinalCheckoutForm = ({
  orderType,
  setOrderType,
  handleOrderTypeChange,
  staffTipAmount,
  handleAddStaffTip,
  handleOtherStaffAmount,
  restaurantAddress,
  cartTotalAmount,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  setAddressAutoPlacesDetail,
  placeOrderLoading,
  currentBranch,
  currentDistance,
  setCurrentDistance,
  onClick,
}) => {
  const { control } = useFormContext();
  const router = useRouter();
  const { cartItems } = useStore();

  return (
    <>
      <ScrollShadowUI className="w-full px-5 mx-auto">
        <div className="w-full lg:max-w-[500px] mx-auto py-16 pb-0 lg:pb-16 h-auto">
          <span
            className="flex items-center gap-1 cursor-pointer w-fit"
            onClick={() => router.push("/menu")}
          >
            <ChevronLeft />
            <span className="font-semibold">Back to Menu</span>
          </span>
          <div className="mt-10 divide-y divide_lightDark">
            <div className="pb-6">
              <h1 className="text-5xl font-bold">Checkout</h1>
              <p className="mt-2 textSecondary_lightDark">
                {restaurantAddress}
              </p>
              <div className="flex items-center gap-5 mt-4">
                <RadioGroup
                  orientation="horizontal"
                  value={orderType}
                  onChange={handleOrderTypeChange}
                >
                  <Radio value="delivery">Delivery</Radio>
                  <Radio value="pickUp">Pickup</Radio>
                </RadioGroup>
                <DeliveryDropdown
                  orderType={orderType}
                  setOrderType={setOrderType}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                />
              </div>
            </div>
            <div className="py-10">
              <h6 className="text-xl font-semibold">Your Info</h6>
              <div className="mt-16 space-y-6">
                <UserInfoForm />
              </div>
            </div>
            {orderType === "pickUp" && (
              <div className="py-10">
                <InputUI
                  name="order_note"
                  label="Comments/Requests"
                  placeholder="Optional"
                  placement="outside"
                  size="lg"
                  variant="bordered"
                  control={control}
                  required={false}
                />
              </div>
            )}
            {orderType === "delivery" && (
              <div className="py-10">
                <h6 className="text-xl font-semibold">Delivery Info</h6>
                <div className="mt-16 space-y-12">
                  <DeliveryInfoForm
                    currentDistance={currentDistance}
                    setCurrentDistance={setCurrentDistance}
                    currentBranch={currentBranch}
                    setAddressAutoPlacesDetail={setAddressAutoPlacesDetail}
                  />
                </div>
              </div>
            )}
            <TipSection
              staffTipAmount={staffTipAmount}
              handleAddStaffTip={handleAddStaffTip}
              handleOtherStaffAmount={handleOtherStaffAmount}
            />
            <div className="py-10">
              <h6 className="text-xl font-semibold">Payment Info</h6>
              <div className="mt-8">
                <PaymentElement
                  id="payment-element"
                  options={{ layout: "tabs" }}
                />
                <div className="mt-6 text-sm">
                  Secure payment powered by
                  <span className="ml-1 text-base font-bold">stripe</span>
                </div>
              </div>
            </div>
            <div className="hidden py-5 lg:block">
              <ButtonUI
                fullWidth
                className="flex justify-between"
                size="xl"
                onClick={onClick}
                isLoading={placeOrderLoading}
                disabled={!cartItems?.length}
              >
                <span>
                  Pay for <span className="capitalize">{orderType}</span>
                </span>
                <span>${cartTotalAmount}</span>
              </ButtonUI>
            </div>
          </div>
          <div className="hidden lg:block">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              <PrivacyLinks />
              <li className="textSecondary_lightDark hover:underline">
                <Link href="https://cafescale.com" target="_blank">
                  Made with Cafescale.com
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </ScrollShadowUI>
    </>
  );
};

export default FinalCheckoutForm;
