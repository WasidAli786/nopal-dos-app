import ButtonUI from "@/components/common/ButtonUI";
import WebLogo from "@/components/common/WebLogo";
import { useDisclosure } from "@nextui-org/react";
import { isMobile, isAndroid, isIOS } from "react-device-detect";
import { X } from "lucide-react";
import Link from "next/link";

const MobilePopup = ({ playStoreLink, appStoreLink, restaurantName }) => {
  const isAndroidOpen = isMobile && isAndroid && playStoreLink;
  const isIosOpen = isMobile && isIOS && appStoreLink;
  const { isOpen, onClose } = useDisclosure({
    defaultOpen: isAndroidOpen || isIosOpen,
  });
  return (
    <>
      {isOpen && (
        <div className="fixed bottom-0 right-0 z-50 w-full bgSecondary_lightDark">
          <div className="flex items-center justify-between w-full p-4 bg-primary rounded-t-md">
            <div className="p-2 rounded-md bgSecondary_lightDark">
              <WebLogo className="w-10 h-10" />
            </div>
            <ButtonUI
              isIconOnly
              color="default"
              variant="light"
              radius="full"
              onClick={() => onClose()}
            >
              <X />
            </ButtonUI>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold">
              Get the best experience on our mobile app
            </h2>
            <p className="mt-1 textSecondary_lightDark">
              Save time, earn rewards, get notified about new deals, and more
            </p>
            <Link
              href={`${isAndroid ? playStoreLink : isIOS ? appStoreLink : "/"}`}
            >
              <ButtonUI variant="bordered" fullWidth size="lg" className="mt-5">
                Open the {restaurantName} App
              </ButtonUI>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MobilePopup;
