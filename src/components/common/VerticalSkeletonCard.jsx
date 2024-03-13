import { Skeleton } from "@nextui-org/react";

const VerticalSkeletonCard = () => {
  return (
    <>
      <div
        className="p-4 space-y-3 border border_lightDark rounded-xl"
        radius="lg"
      >
        <Skeleton className="h-40 rounded-lg" />
        <Skeleton className="w-3/5 h-3 rounded-lg" />
        <Skeleton className="w-4/5 h-3 rounded-lg" />
        <Skeleton className="w-2/5 h-3 rounded-lg" />
      </div>
    </>
  );
};

export default VerticalSkeletonCard;
