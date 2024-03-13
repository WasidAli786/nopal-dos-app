"use client";

import { Controller } from "react-hook-form";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

const AutoCompleteUI = ({
  name,
  label,
  placeholder,
  variant,
  color,
  size,
  className,
  placement,
  disabled,
  data,
  autocompleteOnChangeValue,
  setAutocompleteOnChangeValue,
  isLoading,
  onSelectionChange,
  startContent,
  control,
  required,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required === false ? false : "This field is required",
        }}
        render={({ field: { onChange, value }, formState: { errors } }) => {
          return (
            <Autocomplete
              items={data ?? []}
              size={size ?? "md"}
              placeholder={placeholder ?? "Enter placeholder"}
              labelPlacement={placement}
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
              radius="sm"
              value={value}
              inputValue={autocompleteOnChangeValue}
              onInputChange={(e) => setAutocompleteOnChangeValue(e)}
              onSelectionChange={(e) => {
                onChange(e);
                onSelectionChange(e);
              }}
              isLoading={isLoading}
              allowsCustomValue
              isInvalid={errors?.[name] ? true : false}
              errorMessage={errors?.[name] && errors[name]?.message}
              startContent={startContent}
              aria-labelledby={label ?? "label"}
            >
              {(item) => (
                <AutocompleteItem key={item.value}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
          );
        }}
      />
    </>
  );
};

export default AutoCompleteUI;
