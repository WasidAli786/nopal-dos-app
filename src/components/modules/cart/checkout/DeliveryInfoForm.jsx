import { useEffect, useState } from "react";
import AddressAutocomplete from "../../address/AddressAutocomplete";
import InputUI from "@/components/common/InputUI";
import Services from "@/config/services";
import { useDebounce } from "@/hooks/useDebounce";
import { getUserDistance } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

const DeliveryInfoForm = ({
  currentDistance,
  setCurrentDistance,
  currentBranch,
  setAddressAutoPlacesDetail,
}) => {
  const { control, setValue, setError, clearErrors } = useFormContext();

  const [autocompleteOnChangeValue, setAutocompleteOnChangeValue] =
    useState("");
  const [addressPlaceId, setAddressPlaceId] = useState("");
  const [autoSuggestionToggle, setAutoSuggestionToggle] = useState(false);
  const searchQuery = useDebounce(autocompleteOnChangeValue);

  // *For getting the address auto suggestions
  const { data: addressItems, isLoading: addressItemsLoading } = useQuery({
    queryKey: ["addressAutoPlaces", searchQuery],
    queryFn: () => Services.getAddressAutoPlacesList(searchQuery),
    enabled: !!searchQuery,
    select: (data) =>
      data?.predictions?.map((items) => {
        return {
          label: items?.description,
          value: items?.place_id,
        };
      }),
  });

  // *For getting the address details
  const { data: addressAutoPlacesDetailData, isSuccess } = useQuery({
    queryKey: ["addressAutoPlacesDetail", addressPlaceId],
    queryFn: () => Services.getAddressAutoPlacesDetail(addressPlaceId),
    enabled: !!addressPlaceId,
    select: (data) => data?.result?.geometry?.location,
  });

  if (isSuccess) {
    // *For getting the distance between two points
    const currentDistanceResult = getUserDistance(
      addressAutoPlacesDetailData?.lat,
      addressAutoPlacesDetailData?.lng,
      currentBranch?.latitude,
      currentBranch?.longitude
    );
    setCurrentDistance(currentDistanceResult);
    setAddressAutoPlacesDetail(addressAutoPlacesDetailData);
  }

  // *Handle auto suggestions onchange
  const handleAddressAutoSuggestions = (e) => {
    const value = e.target.value;
    clearErrors("address");
    setAutocompleteOnChangeValue(value);
    if (value) {
      setAutoSuggestionToggle(true);
    } else {
      setAutoSuggestionToggle(false);
    }
  };

  // *Handle auto suggestions on select
  const onSelectionAddressChange = (key) => {
    const selectedKey = [...new Set(key)];
    setAddressPlaceId(selectedKey[0]);
    setAutoSuggestionToggle(false);
  };

  useEffect(() => {
    if (addressPlaceId) {
      const addressLabel = addressItems?.find(
        (items) => items?.value === addressPlaceId
      )?.label;
      setValue("address", addressLabel);
    }
  }, [addressPlaceId]);

  useEffect(() => {
    if (currentBranch?.coverage < currentDistance) {
      setError(
        "address",
        { message: "Address is not serviceable for delivery" },
        { shouldFocus: true }
      );
    }
  }, [currentDistance]);
  return (
    <>
      <AddressAutocomplete
        items={addressItems}
        isLoading={addressItemsLoading}
        onChangeProps={handleAddressAutoSuggestions}
        onSelectionChange={onSelectionAddressChange}
        addressPlaceId={addressPlaceId}
        autoSuggestionToggle={autoSuggestionToggle}
        control={control}
      />
      <InputUI
        name="house"
        label="Apt / Suite / Floor"
        placeholder="Apt / Suite / Floor"
        placement="outside"
        size="lg"
        variant="bordered"
        control={control}
        required={false}
      />
      <InputUI
        name="road"
        label="Building Name"
        placeholder="Building Name"
        placement="outside"
        size="lg"
        variant="bordered"
        control={control}
        required={false}
      />
      <InputUI
        name="order_note"
        label="Delivery Instructions"
        placeholder="Delivery Instructions"
        placement="outside"
        size="lg"
        variant="bordered"
        control={control}
        required={false}
      />
    </>
  );
};

export default DeliveryInfoForm;
