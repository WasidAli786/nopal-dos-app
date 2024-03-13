"use client";

import ButtonUI from "@/components/common/ButtonUI";
import { getFixedValue } from "@/utils";
import { useRouter } from "next/navigation";

const OrderDetailsCalculate = ({
  items,
  totalItemsPrice,
  totalTaxAmount,
  totalOrderTipAmount,
  subtotal,
  delivery_charge,
  totalAmount,
}) => {
  const router = useRouter();
  return (
    <>
      <div className="space-y-4">
        <ul className="flex items-center justify-between textSecondary_lightDark">
          <li className="text-xl">Items Price</li>
          <li className="text-xl">${totalItemsPrice}</li>
        </ul>
        <ul className="flex items-center justify-between textSecondary_lightDark">
          <li className="text-xl">Fee & Estimated Tax</li>
          <li className="text-xl">${getFixedValue(totalTaxAmount)}</li>
        </ul>
        {totalOrderTipAmount !== 0 && (
          <ul className="flex items-center justify-between textSecondary_lightDark">
            <li className="text-xl">Staff Tip</li>
            <li className="text-xl">${getFixedValue(totalOrderTipAmount)}</li>
          </ul>
        )}
        <div className="border border-dashed border_lightDark" />
        <ul className="flex items-center justify-between textSecondary_lightDark">
          <li className="text-xl">Subtotal</li>
          <li className="text-xl">${getFixedValue(subtotal)}</li>
        </ul>
        {items?.order?.order_type === "delivery" && (
          <ul className="flex items-center justify-between textSecondary_lightDark">
            <li className="text-xl">Delivery Fee</li>
            <li className="text-xl">${delivery_charge}</li>
          </ul>
        )}
        <div className="border border-dashed border_lightDark" />
        <ul className="flex items-center justify-between">
          <li className="text-xl font-bold text-primary">Total Amount</li>
          <li className="text-xl font-bold text-primary">
            ${getFixedValue(totalAmount)}
          </li>
        </ul>

        <ButtonUI
          fullWidth
          onClick={() => router.push(`/orders/orderTracking/${items?.id}`)}
        >
          Track Order
        </ButtonUI>
      </div>
    </>
  );
};

export default OrderDetailsCalculate;
