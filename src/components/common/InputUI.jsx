"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Eye, EyeOff } from "lucide-react";
import { Controller } from "react-hook-form";
import { emailValidations, passwordValidations } from "@/config/constant";

const InputUI = ({
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
  type,
  control,
  required,
  message,
  pattern,
  patternMessage,
  minLength,
  maxLength,
  minLengthMessage,
  maxLengthMessage,
  disabled,
  onChangeProps,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
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
            value:
              type === "password"
                ? passwordValidations
                : name === "email"
                ? emailValidations
                : pattern,
            message:
              type === "password"
                ? "Password must contain at least one uppercase letter, one digit, and one special character"
                : name === "email"
                ? "Please enter valid email"
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
              label={label ?? ""}
              placeholder={placeholder ?? "Enter placeholder"}
              labelPlacement={placement}
              size={size ?? "md"}
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
              radius={radius ?? "sm"}
              startContent={startContent}
              value={value}
              onChange={(e) => {
                onChange(e);
                onChangeProps && onChangeProps(e);
              }}
              type={
                type === "password" ? (isVisible ? "text" : "password") : type
              }
              disabled={disabled}
              endContent={
                type === "password" ? (
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeOff className="text-2xl pointer-events-none text-default-400" />
                    ) : (
                      <Eye className="text-2xl pointer-events-none text-default-400" />
                    )}
                  </button>
                ) : endContent ? (
                  endContent
                ) : null
              }
              isInvalid={errors?.[name] ? true : false}
              errorMessage={errors?.[name] && errors[name]?.message}
            />
          );
        }}
      />
    </>
  );
};

export default InputUI;
