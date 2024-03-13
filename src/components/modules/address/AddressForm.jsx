"use client";

import { Suspense, useEffect, useState } from "react";
import ButtonUI from "@/components/common/ButtonUI";
import { Chip } from "@nextui-org/react";
import AutoCompleteUI from "@/components/common/AutoCompleteUI";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import Services from "@/config/services";
import { addressType } from "@/config/data";
import { useForm } from "react-hook-form";
import { errorToast, successToast } from "@/utils/toaster";
import { useStore } from "@/store/store";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import GoogleMapUI from "@/components/common/GoogleMapUI";
import PhoneNumberUI from "@/components/common/PhoneNumberUI";
import InputUI from "@/components/common/InputUI";
import SpinnerUI from "@/components/common/SpinnerUI";

const AddressFormSuspense = () => {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const { user } = useStore();
  const { getStorageItem } = useLocalStorage();
  const addressDetails = getStorageItem("address");
  const { id } = useParams();
  const router = useRouter();
  const query = useSearchParams();
  const isPrevPath = query.get("path");
  const queryClient = useQueryClient();

  const [addressTypeValue, setAddressTypeValue] = useState(
    addressType[0].label
  );
  const [mapCoordinates, setMapCoordinates] = useState({
    lat: 0,
    lng: 0,
  });
  const [autocompleteOnChangeValue, setAutocompleteOnChangeValue] =
    useState("");
  const [addressPlaceId, setAddressPlaceId] = useState("");
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
  const {
    data: addressAutoPlacesDetailData,
    isLoading: autoPlacesDetailLoading,
  } = useQuery({
    queryKey: ["addressAutoPlacesDetail", addressPlaceId],
    queryFn: () => Services.getAddressAutoPlacesDetail(addressPlaceId),
    enabled: !!addressPlaceId,
    select: (data) => data?.result?.geometry?.location,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      if (id) {
        return Services.updateAddress(id, data);
      } else {
        return Services.addAddress(data);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      successToast(data.message);
      if (isPrevPath) {
        router.push(isPrevPath);
      } else {
        router.push("/address");
      }
    },
    onError: (data) => {
      errorToast(data);
    },
  });

  // *For getting user current location
  useEffect(() => {
    if (navigator.geolocation && !id) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setMapCoordinates({
            lat: latitude,
            lng: longitude,
          });

          const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
          const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

          try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.results.length > 0) {
              const formattedAddress = data.results[0].formatted_address;
              setAutocompleteOnChangeValue(formattedAddress);
              setValue("address", formattedAddress);
            } else {
              console.error("No address found for the given coordinates");
            }
          } catch (error) {
            console.error("Error fetching address:", error.message);
          }
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }, []);

  // *For selecting the place id from address auto suggestion
  const handleAddressSelect = (key) => {
    setAddressPlaceId(key);
  };

  // *For creating and updating the address
  const handleAddAddress = (data) => {
    const addressPayload = {
      ...data,
      address: autocompleteOnChangeValue ?? data.address,
      address_type: addressTypeValue,
      latitude: addressAutoPlacesDetailData?.lat,
      longitude: addressAutoPlacesDetailData?.lng,
      user_id: user.id,
      _method: id ? "PUT" : "POST",
    };

    mutate(addressPayload);
  };

  useEffect(() => {
    if (autoPlacesDetailLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [autoPlacesDetailLoading]);

  // *For setting the default values in the fields
  const setDefaultValues = (data) => {
    setValue("address", data?.address);
    setValue("house", data?.house);
    setValue("road", data?.road);
    setValue("contact_person_name", data?.contact_person_name);
    setValue("contact_person_number", data?.contact_person_number);
    setAddressTypeValue(data?.address_type);
    setAutocompleteOnChangeValue(data?.address);
    setMapCoordinates({
      lat: addressDetails?.latitude,
      lng: addressDetails?.longitude,
    });
  };

  useEffect(() => {
    if (id && addressDetails?.id) {
      setDefaultValues(addressDetails);
    }
  }, [id, addressDetails?.id]);

  return (
    <>
      <div className="container grid grid-cols-12 mt-10 gap-7">
        <div className="p-6 col-span-full md:col-span-7 bgSecondary_lightDark rounded-2xl h-fit">
          <div className="aspect-video">
            <GoogleMapUI
              lat={addressAutoPlacesDetailData?.lat ?? mapCoordinates.lat}
              lng={addressAutoPlacesDetailData?.lng ?? mapCoordinates.lng}
            />
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Label As</h2>
            <div className="flex flex-wrap gap-3 mt-5">
              {addressType.map((items) => (
                <Chip
                  key={items}
                  radius="sm"
                  variant={
                    items.label === addressTypeValue ? "solid" : "bordered"
                  }
                  color={
                    items.label === addressTypeValue ? "primary" : "default"
                  }
                  className="px-5 font-semibold cursor-pointer h-11"
                  onClick={() => setAddressTypeValue(items.label)}
                >
                  {items.label}
                </Chip>
              ))}
            </div>
            <div className="hidden md:block">
              <div className="flex mt-10 md:justify-end">
                <ButtonUI
                  isLoading={isPending}
                  onClick={handleSubmit(handleAddAddress)}
                >
                  Save Location
                </ButtonUI>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6 col-span-full md:col-span-5 h-fit bgSecondary_lightDark rounded-2xl">
          {id && !addressDetails?.id ? (
            <SpinnerUI />
          ) : (
            <>
              <h2 className="text-2xl font-bold">Delivery Address</h2>
              <form className="space-y-5">
                <div className="space-y-14">
                  <AutoCompleteUI
                    name="address"
                    label="Address Line"
                    placeholder="Search address"
                    placement="outside"
                    size="lg"
                    variant="bordered"
                    data={addressItems}
                    autocompleteOnChangeValue={autocompleteOnChangeValue}
                    setAutocompleteOnChangeValue={setAutocompleteOnChangeValue}
                    isLoading={addressItemsLoading}
                    onSelectionChange={handleAddressSelect}
                    control={control}
                    startContent={
                      <span className="textSecondary_lightDark">
                        <Search />
                      </span>
                    }
                  />
                  <InputUI
                    name="house"
                    label="Apt / Suite / Floor"
                    placeholder="Apt / Suite / Floor"
                    placement="outside"
                    size="lg"
                    variant="bordered"
                    control={control}
                  />
                  <InputUI
                    name="road"
                    label="Building Name"
                    placeholder="Building Name"
                    placement="outside"
                    size="lg"
                    variant="bordered"
                    control={control}
                  />
                  <InputUI
                    name="contact_person_name"
                    label="Contact Person Name"
                    placeholder="Contact Person Name"
                    placement="outside"
                    size="lg"
                    variant="bordered"
                    control={control}
                  />
                </div>
                <PhoneNumberUI
                  name="contact_person_number"
                  label="Contact Person Number"
                  size="lg"
                  control={control}
                  minLength={12}
                  minLengthMessage="Please enter valid phone number"
                />
                <div className="block md:hidden">
                  <ButtonUI
                    fullWidth
                    isLoading={isPending}
                    onClick={handleSubmit(handleAddAddress)}
                    disabled={addressItemsLoading || autoPlacesDetailLoading}
                  >
                    Save Location
                  </ButtonUI>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      {autoPlacesDetailLoading && (
        <div className="fixed top-0 right-0 z-50 w-full min-h-screen overflow-hidden center bg-black/50">
          <span className="text-xl font-semibold">Fetching coordinates...</span>
        </div>
      )}
    </>
  );
};

export default function AddressForm() {
  return (
    <Suspense>
      <AddressFormSuspense />
    </Suspense>
  );
}
