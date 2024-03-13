"use client";

import ButtonUI from "@/components/common/ButtonUI";
import { Plus } from "lucide-react";
import PaymentCard from "@/components/modules/cart/PaymentCard";
import PaymentCardModal from "@/components/modules/cart/PaymentCardModal";
import { useDisclosure } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Services from "@/config/services";
import SpinnerUI from "@/components/common/SpinnerUI";
import EmptyData from "@/components/common/EmptyData";

const PaymentMain = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { data, isFetching } = useQuery({
    queryKey: ["cart"],
    queryFn: Services.getCartList,
  });

  return (
    <>
      <div className="container mt-10">
        <div className="p-5 lg:p-10 rounded-2xl bgSecondary_lightDark">
          <div className="flex items-center justify-between">
            <h1 className="primary_title">Payment</h1>
            <ButtonUI
              startContent={<Plus />}
              size="lg"
              onClick={() => onOpen()}
            >
              Add New
            </ButtonUI>
          </div>
          {isFetching ? (
            <SpinnerUI />
          ) : data?.length ? (
            <div className="grid gap-8 mt-8 md:grid-cols-2 lg:gap-x-16 md:mt-16">
              {data?.map((items) => (
                <PaymentCard
                  key={items?.id}
                  items={items}
                  isDelete
                  itemsLength={data?.length}
                />
              ))}
            </div>
          ) : (
            <EmptyData />
          )}
        </div>
      </div>
      <PaymentCardModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </>
  );
};

export default PaymentMain;
