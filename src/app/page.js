import Banner from "@/components/modules/home/Banner";
import CrossSection from "@/components/modules/home/CrossSection";
import HomeLocations from "@/components/modules/home/HomeLocations";
import { getAllConfigDataRequest } from "@/config/api/server/menu.api";

export default async function Home() {
  const configData = await getAllConfigDataRequest();
  return (
    <>
      <Banner configData={configData} />
      <CrossSection configData={configData} />
      <HomeLocations
        items={configData?.branches}
        coordinates={configData?.restaurant_location_coverage}
      />
    </>
  );
}
