import MenuDetailsModal from "@/components/modules/menu/MenuDetailsModal";
import {
  getRecommendedBeveragesData,
  getRecommendedSidesData,
} from "@/config/api/server/menu.api";

async function MenuDetails() {
  const [recommendedBeveragesData, recommendedSidesData] = await Promise.all([
    getRecommendedBeveragesData(),
    getRecommendedSidesData(),
  ]);
  return (
    <>
      <MenuDetailsModal
        recommendedBeveragesData={recommendedBeveragesData?.products}
        recommendedSidesData={recommendedSidesData?.products}
      />
    </>
  );
}

export default MenuDetails;
