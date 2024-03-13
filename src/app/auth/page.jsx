"use client";

import { useState } from "react";
import CreateAccountModal from "@/components/modules/auth/CreateAccountModal";
import LoginModal from "@/components/modules/auth/LoginModal";
import RegisterModal from "@/components/modules/auth/RegisterModal";
import VerifyPhoneModal from "@/components/modules/auth/VerifyPhoneModal";
import { useDisclosure } from "@nextui-org/react";

const AuthMain = () => {
  const loginState = useDisclosure({ defaultOpen: true });
  const registerState = useDisclosure();
  const verifyPhoneState = useDisclosure();
  const createAccountState = useDisclosure();

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleShowRegisterModal = () => {
    loginState.onClose();
    registerState.onOpen();
  };

  const handleShowLoginModal = () => {
    loginState.onOpen();
    registerState.onClose();
  };

  const handleRegisterContinue = () => {
    registerState.onClose();
    verifyPhoneState.onOpen();
  };

  const handleOtpVerifyForCreateAccount = () => {
    verifyPhoneState.onClose();
    createAccountState.onOpen();
  };

  const onShowRegisterModal = () => {
    createAccountState.onClose();
    registerState.onOpen();
  };

  const handleEditPhone = () => {
    verifyPhoneState.onClose();
    registerState.onOpen();
  };
  return (
    <>
      <LoginModal
        isOpen={loginState.isOpen}
        onOpenChange={loginState.onOpenChange}
        onClose={loginState.onClose}
        onClick={handleShowRegisterModal}
      />
      <RegisterModal
        isOpen={registerState.isOpen}
        onOpenChange={registerState.onOpenChange}
        onClick={handleShowLoginModal}
        handleRegisterContinue={handleRegisterContinue}
        setPhoneNumber={setPhoneNumber}
      />
      <VerifyPhoneModal
        isOpen={verifyPhoneState.isOpen}
        onOpenChange={verifyPhoneState.onOpenChange}
        handleOtpVerifyForCreateAccount={handleOtpVerifyForCreateAccount}
        phoneNumber={phoneNumber}
        handleEditPhone={handleEditPhone}
      />
      <CreateAccountModal
        isOpen={createAccountState.isOpen}
        onOpenChange={createAccountState.onOpenChange}
        onClose={createAccountState.onClose}
        showLoginModal={loginState.onOpen}
        phoneNumber={phoneNumber}
        onClick={onShowRegisterModal}
      />
    </>
  );
};

export default AuthMain;
