"use client";

import ButtonUI from "@/components/common/ButtonUI";
import { HomeIcon, HorizontalMenuIcon, MapIcon } from "@/config/data/Icons";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Services from "@/config/services";
import DeleteModal from "@/components/common/DeleteModal";

const AddressCard = ({ items }) => {
  const router = useRouter();
  const { setStorageItem } = useLocalStorage();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleAddressEdit = () => {
    setStorageItem("address", items);
    router.push(`/address/${items?.id}`);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: Services.deleteAddress,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      successToast(data.message);
    },
    onError: (data) => {
      errorToast(data);
    },
  });

  const handleAddressDelete = (id) => {
    mutate(id);
  };
  return (
    <>
      <div className="flex items-center justify-between h-32 gap-4 px-4 rounded-lg lg:px-8 bgTertiary_lightDark">
        <div className="flex items-center gap-4 lg:gap-8">
          <div>
            <HomeIcon className="fill-primary dark:fill-[#A4A4A4]" />
          </div>
          <div>
            <h2 className="text-xl font-medium capitalize textSecondary_lightDark">
              {items?.address_type}
            </h2>
            <h3 className="line-clamp-2">{items?.address}</h3>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`https://www.google.com/maps?q=${items?.latitude},${items?.longitude}`}
            target="_blank"
          >
            <ButtonUI isIconOnly variant="light" color="default">
              <MapIcon className="fill-primary dark:fill-[#A4A4A4]" />
            </ButtonUI>
          </a>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly variant="light" color="default">
                <HorizontalMenuIcon className="fill-primary dark:fill-[#A4A4A4]" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="settings" onClick={handleAddressEdit}>
                Edit
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => onOpen()}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <DeleteModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        onClick={() => handleAddressDelete(items?.id)}
        loading={isPending}
      />
    </>
  );
};

export default AddressCard;
