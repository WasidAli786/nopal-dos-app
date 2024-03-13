import NextImage from "@/components/common/NextImage";
import { useStore } from "@/store/store";
import { getProductImageBaseUrl } from "@/utils/imagesPath";
import { slugify } from "@/utils/slugify";
import { Heart, PlusCircle } from "lucide-react";
import Link from "next/link";

const PopularItemsCard = ({ items, popularCount }) => {
  const productImageBaseUrl = getProductImageBaseUrl();
  const { setMenuDetailsData } = useStore();

  const handleShowMenuDetails = (menuData) => {
    setMenuDetailsData(menuData);
  };
  return (
    <>
      <Link href={`/menu/${slugify(items?.name)}/${items?.id}`}>
        <div
          className="relative cursor-pointer"
          onClick={() => handleShowMenuDetails(items)}
        >
          <div className="relative w-full h-60 sm:h-64 md:h-72 lg:h-80 xl:h-96">
            <NextImage
              src={`${productImageBaseUrl}${items?.image}`}
              alt={items?.name}
              className="object-cover rounded-lg"
            />
          </div>
          <div className="absolute top-0 flex flex-col justify-end h-full p-4 space-y-1 text-white rounded-lg popular_items_opacity">
            <h3 className="text-sm font-bold">#{popularCount} Popular Item</h3>
            <h2 className="text-xl font-bold">{items?.name}</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <PlusCircle size={20} />
                <h4 className="font-bold font-sm">${items?.price}</h4>
              </div>
              {items?.loyalty_points && (
                <div className="flex items-center gap-1">
                  <Heart size={20} />
                  <h4 className="font-bold font-sm">{items?.loyalty_points}</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PopularItemsCard;
