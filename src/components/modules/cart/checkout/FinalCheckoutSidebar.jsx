import { useEffect } from "react";
import ReactSlider from "@/components/common/ReactSlider";
import ScrollShadowUI from "@/components/common/ScrollShadowUI";
import { SwiperSlide } from "swiper/react";
import MenuCheckoutCard from "../../menu/MenuCheckoutCard";
import { useStore } from "@/store/store";
import ButtonUI from "@/components/common/ButtonUI";
import { getFixedValue } from "@/utils";
import MenuCard from "../../menu/MenuCard";
import PrivacyLinks from "@/components/layout/PrivacyLinks";
import Link from "next/link";

const FinalCheckoutSidebar = ({
  placeOrderLoading,
  popularItems,
  totalTaxAmount,
  tipAmount,
  deliveryFee,
  cartTotalAmount,
  orderType,
  onClick,
}) => {
  const { cartItems, totalAmount } = useStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "visible";
      }
    };

    // Call handleResize initially
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      // Remove event listener on component unmount
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="w-full lg:max-w-[530px] h-full lg:border-l border_lightDark flex flex-col justify-between">
        <ScrollShadowUI>
          <div className="px-6 divide-y lg:p-6 divide_lightDark">
            <div className="hidden pb-6 lg:block">
              <h6 className="text-xl font-semibold">Your Order</h6>
            </div>
            <div className="py-5 space-y-5">
              <h6 className="text-xl font-semibold">People Also Added</h6>
              <ReactSlider>
                {popularItems?.map((items) => (
                  <SwiperSlide style={{ width: "auto" }} key={items?.id}>
                    <MenuCard items={items} />
                  </SwiperSlide>
                ))}
              </ReactSlider>
            </div>
            <div className="hidden divide-y divide_lightDark lg:block">
              {cartItems?.map((items) => (
                <MenuCheckoutCard key={items?.id} items={items} />
              ))}
            </div>
          </div>
        </ScrollShadowUI>
        <ul className="w-full p-6 space-y-4 border-t bgSecondary_lightDark border_lightDark">
          <li className="flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <span>$ {getFixedValue(totalAmount)}</span>
          </li>
          <li className="flex items-center justify-between text-sm">
            <span>Taxes & Fees</span>
            <span>$ {totalTaxAmount}</span>
          </li>
          <li className="flex items-center justify-between text-sm">
            <span>Staff Tip</span>
            <span>$ {tipAmount}</span>
          </li>
          <li className="flex items-center justify-between text-sm">
            <span>Delivery Fee</span>
            <span>$ {getFixedValue(deliveryFee)}</span>
          </li>
          <div className="border border-dashed border-primary" />
          <li className="flex items-center justify-between text-sm text-primary">
            <span>Total Amount</span>
            <span>${cartTotalAmount}</span>
          </li>
        </ul>
      </div>
      <div className="block p-6 lg:hidden">
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
        <div className="block lg:hidden">
          <ul className="flex flex-wrap mt-4 gap-x-4 gap-y-2">
            <PrivacyLinks />
            <li className="textSecondary_lightDark hover:underline">
              <Link href="https://cafescale.com" target="_blank">
                Made with Cafescale.com
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default FinalCheckoutSidebar;
