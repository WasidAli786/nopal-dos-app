import React from "react";
import NextImage from "@/components/common/NextImage";
import { PlusCircle } from "lucide-react";
import ButtonUI from "@/components/common/ButtonUI";
import { useStore } from "@/store/store";
import CartButton from "@/components/common/CartButton";
import { getProductImageBaseUrl } from "@/utils/imagesPath";

const OrderProductCard = ({ items, className, imgHeight }) => {
  const productImageBaseUrl = getProductImageBaseUrl();
  const { addToCart, isAlreadyInCart } = useStore();

  return (
    <>
      <div className={`w-full border rounded-xl border_lightDark ${className}`}>
        <div className={`relative w-full ${imgHeight ?? "h-40"}`}>
          <NextImage
            src={`${productImageBaseUrl}${items?.image}`}
            alt={items?.name}
            className="object-cover rounded-t-xl"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold line-clamp-1">{items?.name}</h3>
          <h3 className="mt-1 font-semibold">$ {items?.price}</h3>
          <div className="flex justify-center mt-3">
            {isAlreadyInCart.includes(items.id) ? (
              <CartButton items={items} />
            ) : (
              <ButtonUI
                size="sm"
                variant="light"
                color="primary"
                isIconOnly
                onClick={() => addToCart(items)}
              >
                <PlusCircle />
              </ButtonUI>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderProductCard;
