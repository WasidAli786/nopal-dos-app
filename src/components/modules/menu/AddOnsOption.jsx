import { Radio, RadioGroup, cn } from "@nextui-org/react";
import { Controller } from "react-hook-form";

const AddOnsOption = ({ radioOptions, name, control, required, className }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required === false ? false : "Please select the option",
        }}
        render={({ field: { onChange, value }, formState: { errors } }) => {
          return (
            <RadioGroup
              value={value}
              onValueChange={onChange}
              isInvalid={errors?.[name] ? true : false}
              errorMessage={errors?.[name] && errors[name]?.message}
              className={className}
            >
              {radioOptions?.map((items) => (
                <Radio
                  key={items}
                  classNames={{
                    base: cn(
                      "m-0 hover:bg-primary-100 dark:hover:bg-content2",
                      "max-w-full cursor-pointer rounded-lg gap-2 py-2 border-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                  }}
                  value={items}
                >
                  {items}
                </Radio>
              ))}
            </RadioGroup>
          );
        }}
      />
    </>
  );
};

export default AddOnsOption;
