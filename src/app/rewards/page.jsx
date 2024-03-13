import { getRewardsList } from "@/config/api/server/order.api";
import RewardsModuleMain from "@/components/modules/rewards/RewardsModuleMain";

async function RewardMain() {
  const rewardsData = await getRewardsList();
  return (
    <>
      <RewardsModuleMain rewardsData={rewardsData?.products} />
    </>
  );
}

export default RewardMain;
