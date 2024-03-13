import { Input } from "@nextui-org/react";
import React from "react";
import { Controller } from "react-hook-form";
import {
  defaultCountries,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";
import "react-international-phone/style.css";

const PhoneInputUI = ({
  name,
  label,
  placeholder,
  variant,
  color,
  size,
  startContent,
  endContent,
  className,
  radius,
  placement,
  control,
  required,
  errors,
  isClearable,
  onClear,
  minLength,
  maxLength,
  minLengthMessage,
  maxLengthMessage,
  disabled,
  onChangeProps,
}) => {
  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ["us"].includes(iso2);
  });
  const { inputValue, handlePhoneValueChange, inputRef } = usePhoneInput({
    defaultCountry: "us",
    disableDialCodePrefill: true,
    countries: countries,
    onChange: ({ phone }) => {
      onChangeProps && onChangeProps(phone);
    },
  });
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required === false ? false : "This field is required",
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
        render={({ field: { onChange, value } }) => {
          return (
            <Input
              ref={inputRef}
              label={
                placement ? (
                  <label className="font-bold text-white">{label ?? ""}</label>
                ) : (
                  label ?? ""
                )
              }
              placeholder={placeholder}
              labelPlacement={placement}
              size={size ?? "md"}
              variant={variant ?? "faded"}
              color={errors?.[name] ? "danger" : color ? color : "primary"}
              classNames={
                (`w-full ${className}`,
                {
                  input: [disabled && "cursor-not-allowed"],
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
                onChange(e);
                handlePhoneValueChange(e);
              }}
              onClear={onClear}
            />
          );
        }}
      />
    </>
  );
};

export default PhoneInputUI;
