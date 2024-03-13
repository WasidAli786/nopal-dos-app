"use client";

import { useEffect } from "react";
import ButtonUI from "@/components/common/ButtonUI";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container flex flex-col items-center justify-center space-y-5 text-center viewport_height">
      <h1 className="text-5xl font-bold sm:text-6xl md:text-8xl lg:text-9xl">
        Something went wrong!
      </h1>
      <ButtonUI onClick={() => reset()} size="lg" variant="light">
        Try again
      </ButtonUI>
    </div>
  );
}
