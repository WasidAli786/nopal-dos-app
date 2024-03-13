"use client";

import ButtonUI from "@/components/common/ButtonUI";
import InputUI from "@/components/common/InputUI";
import MaskInputUI from "@/components/common/MaskInputUI";
import NextImage from "@/components/common/NextImage";
import TextAreaUI from "@/components/common/TextAreaUI";
import { useStore } from "@/store/store";
import { MapPin } from "lucide-react";
import { useForm } from "react-hook-form";

const ContactUs = () => {
  const { configData } = useStore();
  const { control } = useForm();

  return (
    <>
      {/* <div className="container py-20">
        <div className="max-w-xl p-10 mx-auto shadow-lg rounded-2xl">
          <div className="relative mx-auto h-72 max-w-80">
            <NextImage
              src="/images/contact.svg"
              alt="contact-us"
              className="object-contain"
            />
          </div>
          <h6 className="flex items-center justify-center gap-2 mt-5 text-center">
            <div>
              <MapPin className="text-primary" />
            </div>
            Restaurant Address
          </h6>
          <h2 className="mt-2 text-lg text-center textSecondary_lightDark">
            {configData?.restaurant_address}
          </h2>
          <div className="max-w-full md:max-w-[60%] mx-auto mt-5 sm:flex-row">
            <a
              href={`tel:${configData?.restaurant_phone}`}
              target="_blank"
              className="w-full"
            >
              <ButtonUI fullWidth variant="bordered">
                Call Now
              </ButtonUI>
            </a>
          </div>
        </div>
      </div> */}

      <div className="container mt-10">
        <div className="p-5 lg:p-10 rounded-2xl bgSecondary_lightDark">
          <h1 className="primary_title">Contact Us</h1>
          <div className="mt-10 lg:mt-20 lg:max-w-[70%]">
            <div className="grid gap-5 sm:grid-cols-2 md:gap-x-10">
              <InputUI
                name="f_name"
                label="First Name"
                placeholder="Enter first name"
                placement="outside"
                size="lg"
                control={control}
              />
              <InputUI
                name="l_name"
                label="Last Name"
                placeholder="Enter last name"
                placement="outside"
                size="lg"
                control={control}
              />
              <InputUI
                name="email"
                label="Email Address"
                placeholder="Enter email"
                placement="outside"
                size="lg"
                control={control}
              />
              <MaskInputUI
                name="phone"
                label="Contact No."
                mask="(___) ___-____"
                placeholder="(555) 555-5555"
                placement="outside"
                size="lg"
                isPhone
                control={control}
                startContent="+1"
                minLength={14}
                minLengthMessage="Please enter valid phone number"
              />
            </div>
            <div className="mt-5 space-y-5">
              <TextAreaUI
                name="message"
                label="Message"
                placement="outside"
                placeholder="Write your message...."
              />
              <ButtonUI className="w-full px-10 sm:w-auto">Save</ButtonUI>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
