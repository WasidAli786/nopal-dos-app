"use client";

import ButtonUI from "@/components/common/ButtonUI";
import { Check } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Services from "@/config/services";
import SpinnerUI from "@/components/common/SpinnerUI";
import { orderStatus } from "@/config/constant/orderStatus";

const OrderTracking = () => {
  const { orderId } = useParams();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["orderTrack", orderId],
    queryFn: () => Services.getOrderTrackDetails(orderId),
    enabled: !!orderId,
  });

  function getStatusColor(status, section) {
    if (
      section === "order_placed" &&
      (status === orderStatus.confirmed ||
        status === orderStatus.pending ||
        status === orderStatus.processing ||
        status === orderStatus.out_for_delivery ||
        status === orderStatus.delivered)
    ) {
      return "bg-primary";
    } else if (
      section === "preparing_food" &&
      (status === orderStatus.processing ||
        status === orderStatus.out_for_delivery ||
        status === orderStatus.delivered)
    ) {
      return "bg-primary";
    } else if (
      section === "food_on_the_way" &&
      (status === orderStatus.out_for_delivery ||
        status === orderStatus.delivered)
    ) {
      return "bg-primary";
    } else if (
      section === "delivered_food" &&
      status === orderStatus.delivered
    ) {
      return "bg-primary";
    } else {
      return "bg-secondaryDark dark:bg-white"; // Default color if status doesn't match any of the above
    }
  }

  return (
    <>
      <div className="container mt-10">
        <div className="p-8 bgSecondary_lightDark rounded-2xl">
          {isLoading ? (
            <SpinnerUI />
          ) : (
            <>
              <div className="flex flex-col items-center space-y-4 text-center">
                <h1 className="text-3xl font-bold md:text-5xl">
                  Order Tracking
                </h1>
                <h3 className="text-xl font-semibold textSecondary_lightDark md:text-2xl">
                  Be Prepared your food will arrive any moment now
                </h3>
                <h2 className="text-2xl font-semibold md:text-4xl">
                  20 - 25 Min
                </h2>
              </div>
              <div className="mt-10 md:mt-20">
                <div>
                  <div className="flex items-center gap-6">
                    <div
                      className={`rounded-full h-11 w-11 center ${getStatusColor(
                        data?.order_status,
                        "order_placed"
                      )}`}
                    >
                      <Check className="text-background" />
                    </div>
                    <h3 className="text-2xl font-semibold textSecondary_lightDark">
                      Order Placed
                    </h3>
                  </div>
                  <hr
                    className={`w-[2px] h-14 ml-5 my-1 ${getStatusColor(
                      data?.order_status,
                      "order_placed"
                    )}`}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-6">
                    <div
                      className={`rounded-full h-11 w-11 center ${getStatusColor(
                        data?.order_status,
                        "preparing_food"
                      )}`}
                    >
                      <Check className="text-background" />
                    </div>
                    <h3 className="text-2xl font-semibold textSecondary_lightDark">
                      Preparing Food
                    </h3>
                  </div>
                  <hr
                    className={`w-[2px] h-14 ml-5 my-1 ${getStatusColor(
                      data?.order_status,
                      "preparing_food"
                    )}`}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-6">
                    <div
                      className={`rounded-full h-11 w-11 center ${getStatusColor(
                        data?.order_status,
                        "food_on_the_way"
                      )}`}
                    >
                      <Check className="text-background" />
                    </div>
                    <h3 className="text-2xl font-semibold textSecondary_lightDark">
                      Food on the way
                    </h3>
                  </div>
                  <hr
                    className={`w-[2px] h-14 ml-5 my-1 ${getStatusColor(
                      data?.order_status,
                      "food_on_the_way"
                    )}`}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-6">
                    <div
                      className={`rounded-full bg-secondaryDark h-11 w-11 center ${getStatusColor(
                        data?.order_status,
                        "delivered_food"
                      )}`}
                    >
                      <Check className="text-background" />
                    </div>
                    <h3 className="text-2xl font-semibold textSecondary_lightDark">
                      Delivered the food
                    </h3>
                  </div>
                </div>
                <div className="flex justify-center mt-10">
                  <ButtonUI className="px-28" onClick={() => router.back()}>
                    Back to Home
                  </ButtonUI>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderTracking;
