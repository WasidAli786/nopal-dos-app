"use client";

import { useStore } from "@/store/store";

const PrivacyPolicy = () => {
  const { configData } = useStore();
  return (
    <>
      <div className="container py-10">
        <h1 className="text-2xl font-bold text-center">Privacy Policy</h1>
        <div
          className="mt-10"
          dangerouslySetInnerHTML={{ __html: configData?.privacy_policy }}
        ></div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
