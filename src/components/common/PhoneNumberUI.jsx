import React from "react";
import { Controller } from "react-hook-form";
import {
  PhoneInput,
  defaultCountries,
  parseCountry,
} from "react-international-phone";
import "react-international-phone/style.css";

const PhoneNumberUI = ({
  name,
  label,
  size,
  className,
  required,
  control,
  minLength,
  minLengthMessage,
  disabled,
  onChangeProp,
}) => {
  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ["us"].includes(iso2);
  });
  return (
    <>
      <div className="w-full">
        {label && (
          <div className="mb-1">
            <label className="text-sm font-bold">{label}</label>
          </div>
        )}
        <Controller
          name={name ?? ""}
          control={control}
          rules={{
            required: required === false ? false : "This field is required",
            minLength: {
              value: minLength,
              message: minLengthMessage,
            },
          }}
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <PhoneInput
              placeholder="+1(111) 111-1111"
              countries={countries}
              hideDropdown
              value={value}
              className={`w-full ${
                disabled && "cursor-not-allowed"
              } ${className}`}
              onChange={(e) => {
                onChange(e);
                onChangeProp && onChangeProp(e);
              }}
              disabled={disabled}
              inputStyle={{
                height: size === "lg" ? "3rem" : "2.5rem",
                background: "transparent",
                border: "2px solid #5E5E5E",
                borderLeft: 0,
                color: "white",
                width: "100%",
                borderRadius: "0 8px 8px 0",
              }}
              countrySelectorStyleProps={{
                buttonStyle: {
                  height: size === "lg" ? "3rem" : "2.5rem",
                  background: "transparent",
                  border: "2px solid #5E5E5E",
                  width: "2.5rem",
                  borderRadius: "8px 0 0 8px",
                },
              }}
            />
          )}
        />
        {errors?.[name] && (
          <span className="text-xs text-danger">{errors[name]?.message}</span>
        )}
      </div>
    </>
  );
};

export default PhoneNumberUI;
