import React from "react";
import {
  DeleteIcon,
  PaymentIcon,
  PaymentSelectedIcon,
} from "@/config/data/Icons";
import ButtonUI from "@/components/common/ButtonUI";
import DeleteModal from "@/components/common/DeleteModal";
import { useDisclosure } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/toaster";
import Services from "@/config/services";

const PaymentCard = ({ items, isDelete, itemsLength }) => {
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { mutate: handleDeleteCartMutate, isPending } = useMutation({
    mutationFn: Services.deleteCart,
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data); // will update the old data with the new return
      successToast("Deleted successfully");
      onClose();
    },
    onError: (data) => {
      errorToast(data);
    },
  });

  const { mutate: handleSetDefaultCartMutate } = useMutation({
    mutationFn: Services.setDefaultCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      successToast("Default selected successfully");
    },
    onError: (data) => {
      errorToast(data);
    },
  });

  const handleDeleteCart = (id) => {
    handleDeleteCartMutate({ payment_id: id });
  };
  const handleSetDefaultCart = (id) => {
    handleSetDefaultCartMutate({ payment_id: id });
  };

  return (
    <>
      <div
        className={`flex items-center justify-between px-5 h-[100px] bgSecondary_lightDark rounded-lg border-primary ${
          itemsLength > 1 && "cursor-pointer"
        } ${items?.default_card === "1" ? "border-3" : "border"} relative`}
        onClick={() =>
          itemsLength > 1 && handleSetDefaultCart(items?.payment_id)
        }
      >
        <div className="flex items-center gap-4 md:gap-8">
          <PaymentIcon className="dark:fill-[#A4A4A4] fill-[#515151]" />
          <div>
            <h2 className="text-xl font-medium textSecondary_lightDark">
              {items?.customer_account}
            </h2>
            <h3>4242****4242</h3>
          </div>
        </div>
        {isDelete ? (
          <ButtonUI
            isIconOnly
            size="lg"
            variant="light"
            color="default"
            onClick={() => onOpen()}
          >
            <DeleteIcon />
          </ButtonUI>
        ) : (
          <>
            <div className="absolute top-2 right-2">
              <PaymentSelectedIcon />
            </div>
            <h2 className="text-xl font-medium textSecondary_lightDark">
              $52.58
            </h2>
          </>
        )}
      </div>
      <DeleteModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        onClick={() => handleDeleteCart(items?.payment_id)}
        loading={isPending}
      />
    </>
  );
};

export default PaymentCard;
