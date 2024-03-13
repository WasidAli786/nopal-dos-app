import React from "react";
import ModalUI from "@/components/common/ModalUI";
import ButtonUI from "@/components/common/ButtonUI";
import { LocationIcon, PhoneIcon } from "@/config/data/Icons";

const ChooseStoreModal = ({ isOpen, onOpenChange, branches }) => {
  return (
    <>
      <ModalUI
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        backdrop="blur"
        size="xl"
        className="py-6"
      >
        <div>
          <h2 className="text-3xl font-bold">Select a location</h2>
          <div className="mt-5 divide-primary divide-y-1">
            {branches?.map((items) => (
              <div
                className="flex items-center justify-between gap-10 py-5"
                key={items?.id}
              >
                <div>
                  <h2 className="text-lg font-bold">{items?.name}</h2>
                  <div className="mt-5 space-y-3">
                    {items?.phone && (
                      <div className="flex items-center gap-3">
                        <PhoneIcon />
                        <a
                          href={`tel:${items.phone}`}
                          className="textSecondary_lightDark"
                        >
                          {items.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-start gap-1">
                      <LocationIcon />
                      <a
                        href={`https://www.google.com/maps?q=${items?.latitude},${items?.longitude}`}
                        target="_blank"
                        className="textSecondary_lightDark"
                      >
                        {items.address}
                      </a>
                    </div>
                  </div>
                </div>
                <ButtonUI size="lg">Select</ButtonUI>
              </div>
            ))}
          </div>
        </div>
      </ModalUI>
    </>
  );
};

export default ChooseStoreModal;
