import { CouponIcon } from "@/config/data/Icons";
import dayjs from "dayjs";

const CouponsCard = ({ items }) => {
  return (
    <>
      <div className="relative flex items-center p-5 rounded-lg bgTertiary_lightDark md:px-14">
        <CouponIcon />
        <div className="absolute flex items-center ml-6 xs:ml-12 lg:ml-24">
          <hr className="h-20 border-white border-dashed border-l-3" />
          <div className="ml-5">
            <h3 className="font-semibold text-background">{items?.title}</h3>
            <h3 className="text-sm text-white">{items?.code}</h3>
            <h3 className="font-semibold text-background">
              {items?.coupon_type}
            </h3>
            <h3 className="text-sm text-white">
              Valid till&nbsp;
              {dayjs(items?.expire_date).format("D MMM, YYYY")}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponsCard;
