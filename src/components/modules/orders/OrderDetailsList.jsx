import { CheckCircle2 } from "lucide-react";
import NextImage from "@/components/common/NextImage";
import ButtonUI from "@/components/common/ButtonUI";
import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const OrderDetailsList = ({ items, orderId, data }) => {
  return (
    <>
      <div>
        <div className="flex justify-between gap-5 pb-5 border-b border_lightDark">
          <div className="space-y-2">
            <h3 className="text-xl">
              Order ID:
              <span className="ml-1 font-bold">{orderId}</span>
            </h3>
            <h3 className="text-xl">
              Item:
              <span className="ml-1 font-semibold text-primary">
                {data?.length}
              </span>
            </h3>
          </div>
          <div className="space-y-2">
            <h3 className="flex items-center gap-3 text-xl font-medium">
              <CheckCircle2 />
              <span>{dayjs(items?.order?.delivery_date).format("lll")}</span>
            </h3>
            <ButtonUI variant="bordered" fullWidth color="default" size="sm">
              Delivery Address
            </ButtonUI>
          </div>
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-center">
          Payment Info
        </h3>
        <div className="py-6 border-b border_lightDark">
          <div className="flex items-center">
            <h3 className="min-w-32">Status:</h3>
            <h3 className="font-semibold capitalize text-primary">
              {items?.order?.payment_status}
            </h3>
          </div>
          <div className="flex items-center">
            <h3 className="min-w-32">Method:</h3>
            <h3 className="font-semibold capitalize text-primary">
              {items?.order?.payment_method}
            </h3>
          </div>
        </div>
        <div className="divide-y divide_lightDark">
          {data?.map((items) => (
            <div className="flex gap-5 py-8" key={items?.id}>
              <div className="relative min-w-[100px] h-[100px]">
                <NextImage
                  src="/images/homeSection1.png"
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-between w-full md:flex-row">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">
                    {items?.product_details?.name}
                  </h3>
                  <h6 className="textSecondary_lightDark">
                    $ {items?.product_details?.price}
                  </h6>
                </div>
                <h3 className="text-xl font-semibold">
                  Quantity:
                  <span className="ml-1 text-primary">{items?.quantity}</span>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderDetailsList;
