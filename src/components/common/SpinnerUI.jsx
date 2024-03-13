import { Spinner } from "@nextui-org/react";

const SpinnerUI = ({ className }) => {
  return (
    <>
      <div
        className={`flex items-center justify-center w-full ${
          className ?? "min-h-[50vh]"
        }`}
      >
        <Spinner size="lg" />
      </div>
    </>
  );
};

export default SpinnerUI;
