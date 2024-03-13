"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Switch,
} from "@nextui-org/react";
import { navList } from "@/config/data";
import ButtonUI from "../common/ButtonUI";
import { Menu, MoonIcon, MoveRight, ShoppingCart, SunIcon } from "lucide-react";
import Sidebar from "./Sidebar";
import LogoutModal from "../modules/auth/LogoutModal";
import { usePathname, useRouter } from "next/navigation";
import { CartIcon, DownArrowIcon, TimeIcon } from "@/config/data/Icons";
import { useStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import Services from "@/config/services";
import { errorToast } from "@/utils/toaster";
import CheckoutSidebar from "../modules/cart/checkout/CheckoutSidebar";
import SignUpSidebar from "../modules/auth/SignUpSidebar";
import { useTheme } from "next-themes";
import WebLogo from "../common/WebLogo";
import dayjs from "dayjs";
import { getUserImageBaseUrl } from "@/utils/imagesPath";

const Navbar = () => {
  const router = useRouter();
  const userImageBaseUrl = getUserImageBaseUrl();
  const currentPathname = usePathname();
  const logoutModalState = useDisclosure();
  const { user, cartItems, setConfigData, currentBranch, setCurrentBranch } =
    useStore();
  const { theme, setTheme } = useTheme();

  let filteredNavList = navList.filter(
    (items) =>
      user?.id || (items.link !== "/orders" && items.link !== "/rewards")
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCheckoutSidebarOpen, setIsCheckoutSidebarOpen] = useState(false);
  const [isAuthSidebarOpen, setIsAuthSidebarOpen] = useState(false);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["config"],
    queryFn: () => Services.getAllConfigData(),
  });

  if (isError) {
    return errorToast("Error while fetching the config api");
  }

  const handleCartClick = () => {
    setIsCheckoutSidebarOpen(true);
  };

  useEffect(() => {
    if (isSuccess) {
      setConfigData(data);
      if (!currentBranch && data?.branches?.length === 1) {
        setCurrentBranch(data?.branches[0]);
      }
    }
  }, [isSuccess]);

  // Change theme every 12 hours
  const shouldSwitchTheme = () => {
    const currentHour = dayjs().hour();
    return currentHour >= 12;
  };

  useEffect(() => {
    const theme = shouldSwitchTheme() ? "dark" : "light";
    setTheme(theme);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-40 w-full bg-white shadow dark:bg-dark">
        <div className="container flex items-center justify-between h-20 transition-all">
          <div className="flex items-center gap-4 lg:gap-8">
            <WebLogo />
            <div className="hidden md:block">
              <ul className="flex items-center gap-4 lg:gap-8 list_items">
                {filteredNavList.map((items, index) => (
                  <li key={index} className="text-sm">
                    <Link
                      href={items.link}
                      className={`text-sm ${
                        currentPathname === items.link ? "text-primary" : ""
                      }`}
                    >
                      {items.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* <div className="hidden md:block">
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Button
                    variant="light"
                    color="default"
                    startContent={<TimeIcon />}
                    endContent={<DownArrowIcon />}
                  >
                    Open
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="border rounded bg-background border-primaryBorderDark">
                  <ul className="px-2 py-4 space-y-3">
                    {configData?.restaurant_schedule_time?.map(
                      (items, index) => (
                        <li className="flex items-center gap-5" key={index}>
                          <span>{items?.day}:</span>
                          {items?.opening_time} - {items?.closing_time}
                        </li>
                      )
                    )}
                  </ul>
                </PopoverContent>
              </Popover>
            </div> */}
            <Switch
              startContent={<SunIcon />}
              endContent={<MoonIcon />}
              isSelected={theme === "dark" ? true : false}
              onValueChange={(e) => setTheme(e ? "dark" : "light")}
            />
            {!user?.id && currentPathname === "/menu" && (
              <div className="hidden md:block">
                <ButtonUI
                  color="default"
                  variant="light"
                  onClick={() => setIsAuthSidebarOpen(true)}
                >
                  Login
                </ButtonUI>
              </div>
            )}
            <div className="hidden md:block">
              {currentPathname === "/menu" && (
                <ButtonUI startContent={<CartIcon />} onClick={handleCartClick}>
                  Cart {cartItems?.length > 0 && `(${cartItems?.length})`}
                </ButtonUI>
              )}
              {currentPathname !== "/menu" && (
                <ButtonUI onClick={() => router.push("/menu")}>
                  Order Now
                </ButtonUI>
              )}
            </div>
            {user?.id && (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    showFallback
                    as="button"
                    size="sm"
                    className="transition-transform"
                    src={
                      user?.image
                        ? `${userImageBaseUrl}${user?.image}`
                        : "/images/user.png"
                    }
                    alt={user?.f_name}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  {user?.email && (
                    <DropdownItem key="profile" className="gap-2 h-14">
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">{user?.email}</p>
                    </DropdownItem>
                  )}
                  <DropdownItem key="settings">
                    <Link href="/profile">My Profile</Link>
                  </DropdownItem>
                  <DropdownItem key="coupons">
                    <Link href="/coupons">Coupons</Link>
                  </DropdownItem>
                  Wallet
                  <DropdownItem key="wallet">
                    <Link href="/cart/payment">Wallet</Link>
                  </DropdownItem>
                  <DropdownItem key="orders">
                    <Link href="/orders">Orders</Link>
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onClick={() => logoutModalState.onOpen()}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
            <div className="block md:hidden">
              <ButtonUI
                isIconOnly
                variant="light"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu />
              </ButtonUI>
            </div>
          </div>
        </div>
      </nav>
      {!user?.id && (
        <div className="p-2 bg-primary center">
          <div
            className="gap-2 text-center text-white cursor-pointer w-fit center"
            onClick={() => setIsAuthSidebarOpen(true)}
          >
            <h2 className="font-normal">
              Join Nopal Dos Rewards, win $500! Be entered in a drawing to win
              on 1/1
            </h2>
            <div>
              <MoveRight />
            </div>
          </div>
        </div>
      )}
      {currentPathname === "/menu" && (
        <div className="fixed bottom-0 z-50 block w-full p-5 border-t bgSecondary_lightDark md:hidden border_lightDark">
          <ButtonUI
            fullWidth
            size="lg"
            startContent={<ShoppingCart />}
            onClick={handleCartClick}
          >
            Cart {cartItems?.length > 0 && `(${cartItems?.length})`}
          </ButtonUI>
        </div>
      )}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setIsAuthSidebarOpen={setIsAuthSidebarOpen}
        navList={filteredNavList}
        currentPathname={currentPathname}
        userId={user?.id}
      />
      <LogoutModal
        isOpen={logoutModalState.isOpen}
        onOpenChange={logoutModalState.onOpenChange}
        onClose={logoutModalState.onClose}
      />
      <CheckoutSidebar
        isCheckoutSidebarOpen={isCheckoutSidebarOpen}
        setIsCheckoutSidebarOpen={setIsCheckoutSidebarOpen}
      />
      <SignUpSidebar
        isAuthSidebarOpen={isAuthSidebarOpen}
        setIsAuthSidebarOpen={setIsAuthSidebarOpen}
      />
    </>
  );
};

export default Navbar;
