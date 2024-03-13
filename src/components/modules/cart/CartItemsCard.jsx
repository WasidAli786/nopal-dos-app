import React from "react";
import CartButton from "@/components/common/CartButton";
import NextImage from "@/components/common/NextImage";

const CartItemsCard = ({ items }) => {
  return (
    <>
      <div className="flex items-center justify-between gap-2 p-5 rounded-2xl bgSecondary_lightDark">
        <div className="flex gap-4">
          <div className="relative h-20 min-w-20 md:min-w-24 md:h-24">
            <NextImage
              src="/images/homeSection1.png"
              className="object-cover rounded-lg"
            />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold md:text-lg lg:text-xl">
              {items?.name}
            </h3>
            <h6 className="textSecondary_lightDark">$ {items?.price}</h6>
          </div>
        </div>
        <div className="flex items-center justify-center h-10 px-3 border rounded sm:px-6 md:h-14 border_lightDark bg-background">
          <CartButton items={items} />
        </div>
      </div>
    </>
  );
};

export default CartItemsCard;
