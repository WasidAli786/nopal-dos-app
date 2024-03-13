"use client";

import { useState } from "react";
import ButtonUI from "@/components/common/ButtonUI";
import ModalUI from "@/components/common/ModalUI";
import NextImage from "@/components/common/NextImage";
import {
  CheckboxGroup,
  RadioGroup,
  Radio,
  cn,
  Chip,
  Checkbox,
} from "@nextui-org/react";
import RecommendedCard from "./RecommendedCard";
import CartButton from "@/components/common/CartButton";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { getFixedValue } from "@/utils";
import { X } from "lucide-react";
import { getProductImageBaseUrl } from "@/utils/imagesPath";

const MenuDetailModal = ({
  recommendedSidesData,
  recommendedBeveragesData,
}) => {
  const router = useRouter();
  const productImageBaseUrl = getProductImageBaseUrl();
  const [groupSelected, setGroupSelected] = useState([]);

  const {
    addToCart,
    menuDetailQty,
    incMenuDetailQty,
    decMenuDetailQty,
    menuDetailsData,
    menuDetailAmount,
  } = useStore();

  const handleAddItemsToCart = (data) => {
    const updatedItemWithQty = {
      ...data,
      quantity: menuDetailQty,
    };
    addToCart(updatedItemWithQty);
    router.push("/cart/check-out");
  };

  const handleCloseMenuDetailModal = () => {
    router.push("/menu");
  };
  return (
    <>
      <ModalUI
        isOpen={true}
        hideCloseButton={true}
        noPadding
        size="2xl"
        scrollBehavior="inside"
        backdrop="blur"
        titleContent={
          <div className="flex items-center justify-between w-full">
            <span>{menuDetailsData?.name}</span>
            <ButtonUI
              isIconOnly
              color="default"
              variant="light"
              size="sm"
              radius="full"
              onClick={handleCloseMenuDetailModal}
            >
              <X />
            </ButtonUI>
          </div>
        }
        footerContent={
          <div className="flex items-center w-full gap-4">
            <div className="flex items-center justify-center w-full h-12 border rounded sm:w-auto border_lightDark px-7">
              <CartButton
                items={menuDetailsData}
                menuDetailQty={menuDetailQty}
                incMenuDetailQty={incMenuDetailQty}
                decMenuDetailQty={decMenuDetailQty}
              />
            </div>
            <ButtonUI
              size="lg"
              className="w-full"
              onClick={() => handleAddItemsToCart(menuDetailsData)}
            >
              Add item - ${getFixedValue(menuDetailAmount)}
            </ButtonUI>
          </div>
        }
      >
        <div className="relative w-full min-h-80">
          <NextImage
            src={`${productImageBaseUrl}${menuDetailsData?.image}`}
            alt={menuDetailsData?.name}
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <div className="pb-5 border-b border_lightDark">
            <h1 className="text-2xl font-bold">{menuDetailsData?.name}</h1>
            <p className="mt-1 textSecondary_lightDark">
              {menuDetailsData?.description}
            </p>
            <h2 className="mt-4 text-xl font-bold text-primary">
              $ {getFixedValue(menuDetailsData?.price)}
            </h2>
          </div>
          {menuDetailsData?.choice_options?.length > 0 && (
            <div className="p-4 mt-5 border rounded-lg border_lightDark bgSecondary_lightDark">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold">Add-ons</h4>
                <Chip color="primary">Required</Chip>
              </div>
              <h4 className="textSecondary_lightDark">Select 1</h4>
              <RadioGroup className="mt-2">
                {menuDetailsData?.choice_options[0]?.options?.map((items) => (
                  <Radio
                    key={items}
                    classNames={{
                      base: cn(
                        "m-0 hover:bg-primary-100 dark:hover:bg-content2",
                        "max-w-full cursor-pointer rounded-lg gap-2 py-4 border-2 border-transparent",
                        "data-[selected=true]:border-primary"
                      ),
                    }}
                  >
                    {items}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
          )}
          {menuDetailsData?.removal_options?.length > 0 && (
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold">Removal Option</h4>
                <Chip color="default">Optional</Chip>
              </div>
              <div className="mt-4">
                <CheckboxGroup defaultValue={["buenos-aires", "london"]}>
                  <div className="divide-y divide_lightDark">
                    {menuDetailsData?.removal_options[0]?.options?.map(
                      (items) => (
                        <Checkbox
                          value="buenos-aires"
                          classNames={{
                            base: "max-w-full m-0 flex items-center flex-row-reverse py-4",
                            label: "w-full",
                          }}
                          key={items}
                        >
                          {items}
                        </Checkbox>
                      )
                    )}
                  </div>
                </CheckboxGroup>
              </div>
            </div>
          )}
          <div className="divide-y divide_lightDark">
            <div className="py-5">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold">
                  Frequently bought together
                </h4>
                <Chip color="default">Optional</Chip>
              </div>
              <div className="mt-2">
                <h6 className="mb-4 font-semibold textSecondary_lightDark">
                  Recommended Sides
                </h6>
                <CheckboxGroup
                  value={groupSelected}
                  onChange={setGroupSelected}
                  classNames={{
                    base: "w-full",
                  }}
                >
                  {recommendedSidesData?.map((items) => (
                    <RecommendedCard key={items?.id} items={items} />
                  ))}
                </CheckboxGroup>
              </div>
            </div>
            <div className="py-5">
              <h6 className="mb-4 font-semibold textSecondary_lightDark">
                Recommended Beverages
              </h6>
              <CheckboxGroup
                value={groupSelected}
                onChange={setGroupSelected}
                classNames={{
                  base: "w-full",
                }}
              >
                {recommendedBeveragesData?.map((items) => (
                  <RecommendedCard key={items?.id} items={items} />
                ))}
              </CheckboxGroup>
            </div>
          </div>
        </div>
      </ModalUI>
    </>
  );
};

export default MenuDetailModal;
