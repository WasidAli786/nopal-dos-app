"use client";

import React from "react";
import ButtonUI from "@/components/common/ButtonUI";
import { Plus } from "lucide-react";
import AddressCard from "@/components/modules/address/AddressCard";
import { useQuery } from "@tanstack/react-query";
import Services from "@/config/services";
import SpinnerUI from "@/components/common/SpinnerUI";
import EmptyData from "@/components/common/EmptyData";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const AddressMain = () => {
  const router = useRouter();
  const { removeStorageItem } = useLocalStorage();
  const { data, isFetching } = useQuery({
    queryKey: ["address"],
    queryFn: Services.getAddressList,
  });

  const handleRedirectToAddNewAddress = () => {
    router.push("/address/addNewAddress");
    removeStorageItem("address");
  };

  return (
    <>
      <div className="container mt-10">
        <div className="p-5 md:p-10 rounded-2xl bgSecondary_lightDark">
          <div className="flex items-center justify-between">
            <h1 className="primary_title">Addresses</h1>
            <ButtonUI
              startContent={<Plus />}
              size="lg"
              onClick={handleRedirectToAddNewAddress}
            >
              Add New
            </ButtonUI>
          </div>
          {isFetching ? (
            <SpinnerUI />
          ) : data?.length ? (
            <div className="grid gap-6 mt-10 lg:gap-x-20 md:grid-cols-2 md:mt-20">
              {data?.map((items) => (
                <AddressCard key={items?.id} items={items} />
              ))}
            </div>
          ) : (
            <EmptyData />
          )}
        </div>
      </div>
    </>
  );
};

export default AddressMain;
