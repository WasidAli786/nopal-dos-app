import { useState } from "react";
import SelectUI from "@/components/common/SelectUI";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { ChevronDown } from "lucide-react";
import { orderTypeData } from "@/config/data";
import { getDaysFromToday, getTimeIntervals } from "@/utils";

const DeliveryDropdown = ({
  orderType,
  setOrderType,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}) => {
  const { control } = useForm();

  const [filterSelectedTime, setFilterSelectedTime] = useState(
    getTimeIntervals()
  );
  const [selectedDateLabel, setSelectedDateLabel] = useState("Today");

  const handleOrderDateChange = (e) => {
    const getLabel = getDaysFromToday()?.find(
      (items) => items?.value === e
    )?.label;
    setSelectedDateLabel(getLabel);
    setSelectedDate(e);

    if (getLabel !== "Today") {
      setFilterSelectedTime(
        filterSelectedTime.filter((option) => option.label !== "ASAP")
      );
    } else {
      setFilterSelectedTime(getTimeIntervals());
    }
  };

  const handleOrderTimeChange = (e) => {
    setSelectedTime(e);
  };

  const handleOrderTypeChange = (value) => {
    setOrderType(value);
  };

  return (
    <>
      <Popover placement="bottom" className="p-0">
        <PopoverTrigger>
          <span className="flex items-center gap-1 text-sm cursor-pointer">
            {selectedDateLabel === "Today" &&
            selectedTime === "ASAP" &&
            orderType === "pickUp"
              ? "10 mins"
              : selectedDateLabel === "Today" &&
                selectedTime === "ASAP" &&
                orderType === "delivery"
              ? "20 mins"
              : `${selectedDateLabel} at ${selectedTime}`}
            <ChevronDown size={16} />
          </span>
        </PopoverTrigger>
        <PopoverContent className="min-w-[400px] p-0">
          <div className="w-full rounded-md">
            <div className="flex items-center justify-center p-3 border-b gap-28 border_lightDark">
              {orderTypeData.map((items) => (
                <span
                  className={`text-sm leading-7 textSecondary_lightDark cursor-pointer ${
                    orderType === items.value && "border-b-2 border-primary"
                  }`}
                  key={items.value}
                  onClick={() => handleOrderTypeChange(items.value)}
                >
                  {items.label}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 px-5 py-4">
              <SelectUI
                name="delivery_date"
                placement="outside"
                size="md"
                variant="bordered"
                control={control}
                options={getDaysFromToday()}
                onChangeProps={handleOrderDateChange}
                selectedKeys={selectedDate}
              />
              <SelectUI
                name="delivery_time"
                placement="outside"
                size="md"
                variant="bordered"
                control={control}
                options={filterSelectedTime}
                onChangeProps={handleOrderTimeChange}
                selectedKeys={filterSelectedTime[0].value}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DeliveryDropdown;
