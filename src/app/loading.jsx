"use client";

import { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  return (
    <>
      <div className="viewport_height center z-[999] bg-background">
        <div className="progress"></div>
      </div>
    </>
  );
};

export default Loading;
