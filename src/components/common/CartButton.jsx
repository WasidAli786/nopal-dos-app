import React from "react";
import { Button } from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";
import { useStore } from "@/store/store";

const CartButton = ({
  size,
  items,
  menuDetailQty,
  incMenuDetailQty,
  decMenuDetailQty,
}) => {
  const { increaseQuantity, decreaseQuantity } = useStore();
  const quantity = useStore(
    (state) =>
      state.cartItems.find((item) => item.id === items?.id)?.quantity || 1
  );
  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          size={size ?? "sm"}
          variant="light"
          color="primary"
          isIconOnly
          onClick={
            decMenuDetailQty
              ? () => decMenuDetailQty(items)
              : () => decreaseQuantity(items.id)
          }
        >
          <Minus size={16} />
        </Button>
        <div>{menuDetailQty ?? quantity}</div>
        <Button
          size={size ?? "sm"}
          variant="light"
          color="primary"
          isIconOnly
          onClick={
            incMenuDetailQty
              ? () => incMenuDetailQty(items)
              : () => increaseQuantity(items.id)
          }
        >
          <Plus size={16} />
        </Button>
      </div>
    </>
  );
};

export default CartButton;
