"use client";

import { Input } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { useMask } from "@react-input/mask";
import { phoneValidations } from "@/config/constant";

const MaskInputUI = ({
  name,
  label,
  mask,
  replacement,
  placeholder,
  variant,
  color,
  size,
  type,
  isPhone,
  startContent,
  endContent,
  isClearable,
  className,
  radius,
  placement,
  control,
  required,
  disabled,
  onMaskChange,
  onClear,
  message,
  pattern,
  patternMessage,
  minLength,
  maxLength,
  minLengthMessage,
  maxLengthMessage,
}) => {
  const inputRef = useMask({
    mask: mask,
    replacement: replacement ?? "_",
    onMask: (value) => {
      onMaskChange &&
        onMaskChange(isPhone ? `+1${value.detail.input}` : value.detail.input);
    },
  });

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          required: message
            ? message
            : required === false
            ? false
            : "This field is required",
          pattern: {
            value: isPhone ? phoneValidations : pattern,
            message: isPhone
              ? "Please enter valid phone number"
              : patternMessage,
          },
          minLength: {
            value: minLength,
            message: minLengthMessage ?? `Minimum value should be ${minLength}`,
          },
          maxLength: {
            value: maxLength,
            message:
              maxLengthMessage ??
              `Maximum value must no be exceeded by ${maxLength}`,
          },
        }}
        render={({ field: { onChange, value }, formState: { errors } }) => {
          return (
            <Input
              ref={inputRef}
              label={label ?? ""}
              placeholder={placeholder}
              labelPlacement={placement}
              size={size ?? "md"}
              type={type}
              variant={variant ?? "faded"}
              color={errors?.[name] ? "danger" : color ? color : "primary"}
              classNames={
                (`w-full ${className}`,
                {
                  input: [disabled && "cursor-not-allowed"],
                  label: [
                    placement &&
                      "font-bold dark:text-white text-secondaryLight",
                  ],
                })
              }
              disabled={disabled}
              radius={radius ?? "sm"}
              startContent={startContent}
              endContent={endContent}
              isClearable={isClearable}
              isInvalid={errors?.[name] ? true : false}
              errorMessage={errors?.[name] && errors[name]?.message}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              onClear={onClear}
            />
          );
        }}
      />
    </>
  );
};

export default MaskInputUI;
