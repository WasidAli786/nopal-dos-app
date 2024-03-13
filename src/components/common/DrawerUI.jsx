import React, { useEffect } from "react";

const DrawerUI = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isOpen]);
  return (
    <>
      <div
        className={`${
          isOpen && "h-svh w-full bg-black/50 fixed top-0 left-0 z-50"
        }`}
        onClick={() => onClose(false)}
      >
        <div
          className={`w-full md:w-[512px] bg-background h-svh fixed right-0 top-0 z-[999] md:border-l border_lightDark transition-transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default DrawerUI;
