"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Services from "@/config/services";
import SpinnerUI from "@/components/common/SpinnerUI";
import FavoritesCard from "@/components/modules/favorites/FavoritesCard";
import PaginationUI from "@/components/common/PaginationUI";
import EmptyData from "@/components/common/EmptyData";

const FavoritesMain = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => Services.getFavoritesList(),
  });

  return (
    <>
      <div className="container mt-10">
        <div className="p-5 lg:p-10 rounded-2xl bg-secondaryDark">
          <h1 className="text-center primary_title">Your Favorites</h1>
          {isLoading ? (
            <SpinnerUI />
          ) : data?.products?.length ? (
            <>
              <div className="grid gap-5 mt-10 md:gap-10 lg:mt-20 md:grid-cols-2 lg:gap-x-20">
                {data?.products?.map((items) => (
                  <FavoritesCard key={items?.id} items={items} isFavorites />
                ))}
              </div>
              {/* <PaginationUI
                total={data?.total_size}
                onChange={handlePagination}
                className="mt-5"
              /> */}
            </>
          ) : (
            <EmptyData />
          )}
        </div>
      </div>
    </>
  );
};

export default FavoritesMain;
