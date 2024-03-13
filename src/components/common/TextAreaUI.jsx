"use client";

import { Textarea } from "@nextui-org/react";

const TextAreaUI = ({
  name,
  label,
  placeholder,
  variant,
  color,
  size,
  className,
  radius,
  placement,
  onChange,
  disabled,
  minRows,
  maxRows,
  register,
  required,
  errors,
}) => {
  return (
    <>
      <Textarea
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
              placement && "font-bold dark:text-white text-secondaryLight",
            ],
          })
        }
        radius={radius ?? "sm"}
        isInvalid={errors?.[name] ? true : false}
        errorMessage={errors?.[name] && errors[name]?.message}
        onChange={onChange}
        disabled={disabled}
        minRows={minRows ?? 5}
        maxRows={maxRows ?? 5}
        {...(register
          ? {
              ...register(name, {
                required: required === false ? false : "This field is required",
              }),
            }
          : {})}
      />
    </>
  );
};

export default TextAreaUI;
