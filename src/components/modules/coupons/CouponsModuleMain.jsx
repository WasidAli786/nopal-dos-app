import CouponsCard from "./CouponsCard";

const CouponsModuleMain = ({ couponData }) => {
  return (
    <>
      <div className="container mt-10">
        <div className="p-5 lg:p-10 rounded-2xl bgSecondary_lightDark">
          <h1 className="primary_title">Coupons</h1>
          <div className="grid gap-7 mt-7 md:mt-14 md:grid-cols-2 lg:gap-x-14">
            {couponData?.map((items) => (
              <CouponsCard key={items?.id} items={items} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponsModuleMain;
