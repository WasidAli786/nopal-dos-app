"use client";

import React from "react";
import { Checkbox } from "@nextui-org/react";
import { Controller } from "react-hook-form";

const CheckboxUI = ({
  title,
  name,
  control,
  required,
  className,
  isErrorMessage,
  onChangeProps,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required === false ? false : "Please check the checkbox",
        }}
        render={({ field: { onChange, value }, fieldState }) => {
          return (
            <div>
              <Checkbox
                className={className}
                value={value}
                onChange={(e) => {
                  onChange(e.target.checked);
                  onChangeProps(e.target.checked);
                }}
                isInvalid={fieldState.error ? true : false}
              >
                {title ?? ""}
              </Checkbox>
              {fieldState.error && isErrorMessage && (
                <p className="mt-2 text-danger">{fieldState.error.message}</p>
              )}
            </div>
          );
        }}
      />
    </>
  );
};

export default CheckboxUI;
