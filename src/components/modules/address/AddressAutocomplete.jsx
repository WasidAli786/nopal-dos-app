import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import InputUI from "@/components/common/InputUI";
import { MapPin } from "lucide-react";
import SpinnerUI from "@/components/common/SpinnerUI";

const AddressAutocomplete = ({
  control,
  items,
  isLoading,
  onChangeProps,
  onSelectionChange,
  selectedKeys,
  autoSuggestionToggle,
}) => {
  return (
    <div>
      <InputUI
        name="address"
        label="Address Line"
        placeholder="Search address"
        placement="outside"
        size="lg"
        variant="bordered"
        control={control}
        onChangeProps={onChangeProps}
      />
      {isLoading ? (
        <div className="mt-2 rounded-md bg-content2">
          <SpinnerUI className="h-40" />
        </div>
      ) : (
        autoSuggestionToggle && (
          <Listbox
            aria-label="Dynamic Actions"
            items={items ?? []}
            emptyContent={false}
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={onSelectionChange}
            className="mt-2 rounded-md bg-content2"
          >
            {(item) => (
              <ListboxItem startContent={<MapPin />} key={item?.value}>
                {item?.label}
              </ListboxItem>
            )}
          </Listbox>
        )
      )}
    </div>
  );
};

export default AddressAutocomplete;
