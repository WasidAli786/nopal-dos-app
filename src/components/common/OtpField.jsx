"use client";

import React from "react";
import OtpInput from "react-otp-input";
import { Controller } from "react-hook-form";

const OtpField = ({ name, control }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          validate: (value) => value?.length === 4 || "OTP must be 4 digits",
        }}
        render={({ field, fieldState }) => (
          <div>
            <OtpInput
              {...field}
              onChange={(otp) => field.onChange(otp)}
              numInputs={4}
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                height: "70px",
                width: "60px",
                borderRadius: 8,
                outline: "none",
              }}
              containerStyle={{
                gap: "20px",
              }}
            />
            {fieldState.error && (
              <p className="mt-2 text-red-600">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
    </>
  );
};

export default OtpField;
