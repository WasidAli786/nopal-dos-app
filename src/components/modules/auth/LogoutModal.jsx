"use client";

import ButtonUI from "@/components/common/ButtonUI";
import ModalUI from "@/components/common/ModalUI";
import { LogoutIcon } from "@/config/data/Icons";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";

const LogoutModal = ({ isOpen, onOpenChange, onClose }) => {
  const router = useRouter();
  const { logout } = useStore();
  const { removeStorageItem } = useLocalStorage();

  const handleLogout = () => {
    removeStorageItem("checkoutItems");
    logout();
    onClose();
    router.push("/");
  };
  return (
    <>
      <ModalUI
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        backdrop="blur"
      >
        <div className="flex flex-col items-center py-5 space-y-4 text-center">
          <LogoutIcon className="fill-primary" />
          <h2 className="text-xl font-bold">
            Are you sure you want to Sign Out?
          </h2>
          <div className="flex items-center w-full gap-5">
            <ButtonUI fullWidth onClick={handleLogout}>
              Yes
            </ButtonUI>
            <ButtonUI
              fullWidth
              variant="bordered"
              className="dark:text-white"
              onClick={() => onClose()}
            >
              No
            </ButtonUI>
          </div>
        </div>
      </ModalUI>
    </>
  );
};

export default LogoutModal;
