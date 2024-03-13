"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

const ModalUI = ({
  titleContent,
  children,
  footerContent,
  isOpen,
  onOpenChange,
  placement,
  isDismissable,
  backdrop,
  size,
  hideCloseButton,
  scrollBehavior,
  className,
  noPadding,
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={isDismissable}
        hideCloseButton={hideCloseButton}
        scrollBehavior={scrollBehavior}
        placement={placement ?? "top"}
        backdrop={backdrop}
        size={size ?? "lg"}
        className={`bg-background ${className}`}
        classNames={{
          body: noPadding && "p-0",
          base: `${size === "full" && "max-h-screen"}`,
          footer: "border-t border_lightDark",
        }}
      >
        <ModalContent>
          {titleContent && <ModalHeader>{titleContent}</ModalHeader>}
          <ModalBody>{children}</ModalBody>
          {footerContent && <ModalFooter>{footerContent}</ModalFooter>}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalUI;
