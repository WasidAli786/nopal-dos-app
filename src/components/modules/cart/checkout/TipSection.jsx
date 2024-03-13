import InputUI from "@/components/common/InputUI";
import { cartTipData } from "@/config/data";
import { Chip } from "@nextui-org/react";
import { useForm } from "react-hook-form";

const TipSection = ({
  staffTipAmount,
  handleAddStaffTip,
  handleOtherStaffAmount,
}) => {
  const { control } = useForm();
  return (
    <>
      <div className="flex flex-col py-10 space-y-4">
        <span>Tip the Crew</span>
        <div className="flex items-center gap-2">
          {cartTipData.map((items) => (
            <Chip
              key={items.label}
              radius="sm"
              className="h-12 text-sm cursor-pointer"
              color={items.label === staffTipAmount ? "primary" : "default"}
              variant={items.label === staffTipAmount ? "solid" : "bordered"}
              onClick={() => handleAddStaffTip(items.label)}
            >
              {`${items.label === "Other" ? "" : "$"}${items.label}`}
            </Chip>
          ))}
          {staffTipAmount === "Other" && (
            <div className="w-24">
              <InputUI
                size="sm"
                name="order_tip_amount"
                placeholder="0.00"
                type="number"
                startContent="$"
                variant="bordered"
                onChange={handleOtherStaffAmount}
                control={control}
              />
            </div>
          )}
        </div>
        {/* <Checkbox onChange={handleNoTipChange}>
          I don’t want to pay tip.
        </Checkbox> */}
      </div>
    </>
  );
};

export default TipSection;
