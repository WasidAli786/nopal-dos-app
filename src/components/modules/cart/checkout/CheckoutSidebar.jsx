"use client";

import ButtonUI from "@/components/common/ButtonUI";
import ScrollShadowUI from "@/components/common/ScrollShadowUI";
import { useStore } from "@/store/store";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuCheckoutCard from "../../menu/MenuCheckoutCard";
import { getFixedValue } from "@/utils";
import DrawerUI from "@/components/common/DrawerUI";

const CheckoutSidebar = ({
  isCheckoutSidebarOpen,
  setIsCheckoutSidebarOpen,
}) => {
  const { cartItems, totalAmount } = useStore();
  const router = useRouter();

  const handleCloseCheckoutSidebar = () => {
    setIsCheckoutSidebarOpen(false);
  };

  const handleCheckoutContinue = () => {
    setIsCheckoutSidebarOpen(false);
    router.push("/cart/check-out");
  };

  return (
    <>
      <DrawerUI
        isOpen={isCheckoutSidebarOpen}
        onClose={setIsCheckoutSidebarOpen}
      >
        <div className="flex flex-col justify-between h-full">
          <ScrollShadowUI>
            <div className="flex items-center justify-between p-6 border-b border_lightDark">
              <h6 className="text-xl font-semibold">Your Order</h6>
              <ButtonUI
                color="default"
                isIconOnly
                onClick={handleCloseCheckoutSidebar}
              >
                <X />
              </ButtonUI>
            </div>
            <div className="px-6 divide-y divide_lightDark">
              {cartItems?.map((items) => (
                <MenuCheckoutCard key={items?.id} items={items} />
              ))}
            </div>
          </ScrollShadowUI>
          <div className="w-full p-6 space-y-4 border-t bgSecondary_lightDark border_lightDark">
            <span className="text-sm underline cursor-pointer">
              Add Promo Code
            </span>
            <ButtonUI
              fullWidth
              size="lg"
              className="flex justify-between"
              onClick={handleCheckoutContinue}
              disabled={!cartItems?.length}
            >
              <span>Checkout</span>
              <span>${getFixedValue(totalAmount)}</span>
            </ButtonUI>
          </div>
        </div>
      </DrawerUI>
    </>
  );
};

export default CheckoutSidebar;
