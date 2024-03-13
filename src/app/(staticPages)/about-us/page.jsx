"use client";

import { useStore } from "@/store/store";

const AboutUs = () => {
  const { configData } = useStore();
  return (
    <>
      <div className="container py-10">
        <h1 className="text-2xl font-bold text-center">About Us</h1>
        <div
          className="mt-10"
          dangerouslySetInnerHTML={{ __html: configData?.about_us }}
        ></div>
      </div>
    </>
  );
};

export default AboutUs;
