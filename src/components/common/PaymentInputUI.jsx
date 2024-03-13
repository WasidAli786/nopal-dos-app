import { Input } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";

const PaymentInputUI = ({
  name,
  label,
  placeholder,
  variant,
  size,
  fieldType,
  className,
  radius,
  placement,
  control,
  required,
  disabled,
}) => {
  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs();
  const { erroredInputs, touchedInputs } = meta;

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required === false ? false : "This field is required",
        }}
        render={({ field: { onChange, value }, formState: { errors } }) => {
          let inputProps = {};
          if (fieldType === "cardNumber") {
            inputProps = getCardNumberProps;
          } else if (fieldType === "expiryDate") {
            inputProps = getExpiryDateProps;
          } else if (fieldType === "cvc") {
            inputProps = getCVCProps;
          }

          const inputError =
            errors?.[name] ||
            (erroredInputs?.[fieldType] && touchedInputs[fieldType]);

          return (
            <Input
              value={value}
              {...inputProps({
                onChange: (e) => {
                  onChange(e);
                },
              })}
              label={label ?? ""}
              placeholder={placeholder}
              labelPlacement={placement}
              size={size ?? "md"}
              variant={variant ?? "faded"}
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
              endContent={
                fieldType === "cardNumber" && (
                  <svg {...getCardImageProps({ images })} />
                )
              }
              color={inputError ? "danger" : "primary"}
              isInvalid={inputError ? true : false}
              errorMessage={
                inputError
                  ? errors[name]?.message ||
                    (erroredInputs?.[fieldType] &&
                      touchedInputs[fieldType] &&
                      erroredInputs[fieldType])
                  : ""
              }
            />
          );
        }}
      />
    </>
  );
};

export default PaymentInputUI;
