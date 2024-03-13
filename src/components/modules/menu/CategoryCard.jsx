"use client";

import NextImage from "@/components/common/NextImage";
import { useStore } from "@/store/store";
import { getProductImageBaseUrl } from "@/utils/imagesPath";
import { slugify } from "@/utils/slugify";
import { Heart, PlusCircle } from "lucide-react";
import Link from "next/link";

const CategoryCard = ({ items }) => {
  const productImageBaseUrl = getProductImageBaseUrl();
  const { setMenuDetailsData } = useStore();

  const handleShowMenuDetails = (menuData) => {
    setMenuDetailsData(menuData);
  };
  return (
    <>
      <Link href={`/menu/${slugify(items?.name)}/${items?.id}`}>
        <div
          className="flex justify-between gap-6 pb-6 overflow-hidden border-b cursor-pointer md:border border_lightDark md:rounded-lg md:h-48 md:pb-0 hover:border-primary"
          onClick={() => handleShowMenuDetails(items)}
        >
          <div className="flex flex-col justify-center md:p-6">
            <div className="space-y-1">
              <h3 className="font-bold line-clamp-1">{items?.name}</h3>
              <p className="text-sm textSecondary_lightDark line-clamp-2">
                {items?.description}
              </p>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <div className="flex items-center gap-1">
                <PlusCircle size={18} className="text-primary" />
                <h4 className="font-semibold font-sm textSecondary_lightDark">
                  ${items?.price}
                </h4>
              </div>
              {items?.loyalty_points && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1 textSecondary_lightDark">
                    <Heart size={18} />
                    <h4 className="font-semibold font-sm">
                      {items?.loyalty_points}
                    </h4>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="relative h-28 w-28 md:h-48 md:w-48 shrink-0">
            <NextImage
              src={`${productImageBaseUrl}${items?.image}`}
              alt={items?.name}
              className="object-cover md:rounded-r-lg"
            />
          </div>
        </div>
      </Link>
    </>
  );
};

export default CategoryCard;
