"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import OrdersCard from "./OrdersCard";
import EmptyData from "@/components/common/EmptyData";
import { useTheme } from "next-themes";

const OrdersTab = ({ allOrdersList }) => {
  const [selected, setSelected] = useState("running");
  const { theme } = useTheme();

  const historyStatus = ["delivered", "returned", "failed", "canceled"];
  const runningStatus = [
    "pending",
    "processing",
    "out_for_delivery",
    "confirmed",
  ];

  return (
    <>
      <div className="flex flex-col w-full">
        <Tabs
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={setSelected}
          variant="underlined"
          fullWidth
          color="primary"
          disableAnimation
          classNames={{
            tabList: "pt-3",
            tabContent: `${
              theme === "light"
                ? "group-data-[selected=true]:text-secondaryLight"
                : "group-data-[selected=true]:text-white"
            } text-xl md:text-2xl mb-6`,
          }}
        >
          <Tab key="running" title="Running">
            {allOrdersList?.length ? (
              <>
                <div className="grid gap-8 mt-6 lg:gap-x-16 md:grid-cols-2">
                  {allOrdersList?.map((items) => {
                    if (!runningStatus.includes(items?.order_status)) {
                      return null;
                    }
                    return <OrdersCard key={items?.id} items={items} />;
                  })}
                </div>
                {!allOrdersList?.some((items) =>
                  runningStatus.includes(items?.order_status)
                ) && (
                  <EmptyData
                    className="pt-20 pb-0"
                    title="You have no running order"
                  />
                )}
              </>
            ) : (
              <EmptyData
                className="pt-20 pb-0"
                title="You have no running order"
              />
            )}
          </Tab>
          <Tab key="history" title="History">
            {allOrdersList?.length ? (
              <>
                <div className="grid gap-8 mt-6 lg:gap-x-16 md:grid-cols-2">
                  {allOrdersList?.map((items) => {
                    if (!historyStatus.includes(items?.order_status)) {
                      return null;
                    }
                    return <OrdersCard key={items?.id} items={items} />;
                  })}
                </div>
                {!allOrdersList?.some((items) =>
                  historyStatus.includes(items?.order_status)
                ) && (
                  <EmptyData
                    className="pt-20 pb-0"
                    title="You have no order in history"
                  />
                )}
              </>
            ) : (
              <EmptyData
                className="pt-20 pb-0"
                title="You have no order in history"
              />
            )}
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default OrdersTab;
