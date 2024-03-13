import { Select, SelectItem } from "@nextui-org/select";
import { Controller } from "react-hook-form";

const SelectUI = ({
  name,
  label,
  placeholder,
  variant,
  color,
  size,
  className,
  radius,
  placement,
  control,
  required,
  options,
  onChangeProps,
  selectedKeys,
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
            <Select
              label={label ?? ""}
              aria-labelledby={label ?? "label"}
              placeholder={placeholder ?? "Enter placeholder"}
              labelPlacement={placement}
              size={size ?? "md"}
              variant={variant ?? "faded"}
              color={errors?.[name] ? "danger" : color ? color : "primary"}
              classNames={
                (`w-full ${className}`,
                {
                  label: [
                    placement &&
                      "font-bold dark:text-white text-secondaryLight",
                  ],
                })
              }
              radius={radius ?? "sm"}
              isInvalid={errors?.[name] ? true : false}
              errorMessage={errors?.[name] && errors[name]?.message}
              selectedKeys={selectedKeys ? [selectedKeys] : ""}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                onChangeProps && onChangeProps(e.target.value);
              }}
            >
              {options?.map((items) => (
                <SelectItem key={items?.value ?? items?.label}>
                  {items?.label}
                </SelectItem>
              ))}
            </Select>
          );
        }}
      />
    </>
  );
};

export default SelectUI;
