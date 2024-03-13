import React from "react";
import NextImage from "@/components/common/NextImage";
import ButtonUI from "@/components/common/ButtonUI";
import { OrderConfirmIcon } from "@/config/data/Icons";
import { useRouter } from "next/navigation";

const OrdersCard = ({ items }) => {
  const router = useRouter();
  return (
    <>
      <div className="p-5 bgTertiary_lightDark rounded-xl lg:p-8">
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="relative w-20 h-20">
            <NextImage
              src="/images/homeSection1.png"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl">
              Order ID: <span className="font-bold">{items?.id}</span>
            </h3>
            <h4 className="text-lg font-medium textSecondary_lightDark">
              {items?.details_count} Items
            </h4>
            <div className="flex items-center gap-2 text-primary">
              <OrderConfirmIcon />
              <span className="lg">{items?.order_status}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-5 sm:flex-row lg:gap-10">
          <ButtonUI
            fullWidth
            variant="bordered"
            onClick={() => router.push(`orders/${items?.id}`)}
          >
            Details
          </ButtonUI>
          <ButtonUI
            fullWidth
            onClick={() => router.push(`/orders/orderTracking/${items?.id}`)}
          >
            Track Order
          </ButtonUI>
        </div>
      </div>
    </>
  );
};

export default OrdersCard;
