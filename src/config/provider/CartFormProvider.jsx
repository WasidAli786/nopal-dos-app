"use client";

import { FormProvider, useForm } from "react-hook-form";

const CartFormProvider = ({ children }) => {
  const formMethod = useForm();

  return (
    <>
      <FormProvider {...formMethod}>{children}</FormProvider>
    </>
  );
};

export default CartFormProvider;
