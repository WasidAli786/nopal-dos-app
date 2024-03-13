import React from "react";
import Link from "next/link";
import ButtonUI from "../common/ButtonUI";
import { X } from "lucide-react";

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  setIsAuthSidebarOpen,
  navList,
  currentPathname,
  userId,
}) => {
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleShowLoginSidebar = () => {
    handleCloseSidebar();
    setIsAuthSidebarOpen(true);
  };
  return (
    <>
      <div
        className={`min-h-screen w-full transition fixed top-0 right-0 z-50 bgSecondary_lightDark p-10 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-5">
          <ButtonUI isIconOnly color="default" onClick={handleCloseSidebar}>
            <X />
          </ButtonUI>
          {navList.map((items, index) => (
            <li key={index} className="text-lg" onClick={handleCloseSidebar}>
              <Link href={items.link}>{items.label}</Link>
            </li>
          ))}
          {!userId && currentPathname === "/menu" && (
            <div className="block md:hidden">
              <ButtonUI fullWidth onClick={handleShowLoginSidebar}>
                Login
              </ButtonUI>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
