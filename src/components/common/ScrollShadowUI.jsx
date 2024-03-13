import { ScrollShadow } from "@nextui-org/react";

const ScrollShadowUI = ({ children, className, size, hideScrollBar }) => {
  return (
    <>
      <ScrollShadow
        hideScrollBar={hideScrollBar}
        className={className ?? "h-auto"}
        size={size ?? 10}
      >
        {children}
      </ScrollShadow>
    </>
  );
};

export default ScrollShadowUI;
