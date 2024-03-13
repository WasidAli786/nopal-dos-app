import NextImage from "@/components/common/NextImage";
import { PlusCircle } from "lucide-react";

const DiscountCard = () => {
  return (
    <>
      <div className="flex justify-between border rounded-lg border_lightDark">
        <div className="flex flex-col gap-8 p-6">
          <div>
            <h3 className="font-bold">TUESDAY</h3>
            <p className="mt-2 text-sm textSecondary_lightDark line-clamp-2">
              Taco Tuesday: Save $7 when you spend $20 or more. Exclusions
              apply.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <PlusCircle size={20} className="text-primary" />
            <span className="font-semibold textSecondary_lightDark">Add</span>
          </div>
        </div>
        <div className="px-4 py-5 rounded-r-lg bg-primary">
          <div className="relative w-6 h-6">
            <NextImage src="/images/discIcon.svg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscountCard;
