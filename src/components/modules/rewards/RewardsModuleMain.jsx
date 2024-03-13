"use client";

import { Heart } from "lucide-react";
import FavoritesCard from "../favorites/FavoritesCard";
import { useStore } from "@/store/store";

const RewardsModuleMain = ({ rewardsData }) => {
  const { user } = useStore();

  return (
    <>
      <div className="container mt-10">
        <div className="p-5 lg:p-10 rounded-2xl bgSecondary_lightDark">
          <div className="flex flex-col items-center space-y-2 text-center">
            {user?.id ? (
              <>
                <h1 className="flex items-center gap-1 primary_title">
                  {user?.point}
                  <Heart size={40} className="fill-primary text-primary" />
                </h1>
                <h3 className="text-xl font-semibold md:text-2xl textSecondary_lightDark">
                  Hearts Balance
                </h3>
              </>
            ) : (
              <h3 className="text-xl font-semibold md:text-2xl textSecondary_lightDark">
                Login to get rewards
              </h3>
            )}
            <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
              Rewards you can get with hearts
            </h2>
          </div>
          <div className="grid mt-8 gap-7 md:mt-16 md:grid-cols-2 lg:gap-x-14">
            {rewardsData?.map((items) => (
              <FavoritesCard key={items?.id} items={items} userId={user?.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RewardsModuleMain;
