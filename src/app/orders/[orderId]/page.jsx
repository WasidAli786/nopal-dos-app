"use client";

import SpinnerUI from "@/components/common/SpinnerUI";
import OrderDetailsCalculate from "@/components/modules/orders/OrderDetailsCalculate";
import OrderDetailsList from "@/components/modules/orders/OrderDetailsList";
import Services from "@/config/services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

function OrderDetails() {
  // const orderId = params?.orderId;
  // const orderDetailsData = await getOrderDetails(orderId);

  const { orderId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: () => Services.getOrderDetails(orderId),
    enabled: !!orderId,
  });

  return (
    <>
      {isLoading ? (
        <SpinnerUI />
      ) : (
        Array.from(new Set(data?.map((item) => item.order_id))).map(
          (orderId) => {
            const orderItems = data.filter((item) => item.order_id === orderId);
            const firstItem = orderItems[0];

            const totalItemsPrice = orderItems.reduce(
              (acc, item) => acc + item.price,
              0
            );
            const totalTaxAmount = orderItems.reduce(
              (acc, item) => acc + item.order?.total_tax_amount,
              0
            );
            const totalOrderTipAmount = orderItems.reduce(
              (acc, item) => acc + Number(item.order?.order_tip_amount),
              0
            );
            const subtotal =
              totalItemsPrice + totalTaxAmount + totalOrderTipAmount;
            const delivery_charge = firstItem?.order?.delivery_charge;

            const totalAmount =
              totalItemsPrice +
              totalTaxAmount +
              totalOrderTipAmount +
              delivery_charge;

            return (
              <div className="container grid grid-cols-12 gap-6 mt-10 md:gap-12">
                <div className="order-last p-6 pb-0 col-span-full md:col-span-7 lg:col-span-8 bgSecondary_lightDark rounded-2xl md:order-first">
                  <OrderDetailsList
                    items={firstItem}
                    orderId={orderId}
                    data={data}
                  />
                </div>
                <div className="p-5 col-span-full md:col-span-5 h-fit lg:col-span-4 bgSecondary_lightDark rounded-2xl">
                  <OrderDetailsCalculate
                    items={firstItem}
                    totalItemsPrice={totalItemsPrice}
                    totalTaxAmount={totalTaxAmount}
                    totalOrderTipAmount={totalOrderTipAmount}
                    subtotal={subtotal}
                    delivery_charge={delivery_charge}
                    totalAmount={totalAmount}
                  />
                </div>
              </div>
            );
          }
        )
      )}
    </>
  );
}

export default OrderDetails;
