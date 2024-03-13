"use client";

import { useStore } from "@/store/store";

const TermsAndConditions = () => {
  const { configData } = useStore();
  return (
    <>
      <div className="container py-10">
        <h1 className="text-2xl font-bold text-center">Terms & Conditions</h1>
        <div
          className="mt-10"
          dangerouslySetInnerHTML={{ __html: configData?.terms_and_conditions }}
        ></div>
      </div>
    </>
  );
};

export default TermsAndConditions;
