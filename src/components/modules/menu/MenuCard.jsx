import NextImage from "@/components/common/NextImage";
import { useStore } from "@/store/store";
import { getProductImageBaseUrl } from "@/utils/imagesPath";
import { PlusCircle } from "lucide-react";

const MenuCard = ({ items }) => {
  const productImageBaseUrl = getProductImageBaseUrl();
  const { addToCart } = useStore();

  return (
    <>
      <div
        className="flex justify-between h-20 border rounded-md cursor-pointer w-60 border_lightDark"
        onClick={() => addToCart(items)}
      >
        <div className="flex flex-col justify-center w-full px-3 space-y-1">
          <h6 className="line-clamp-1">{items?.name}</h6>
          <span className="flex items-center gap-1">
            <PlusCircle size={14} className="text-primary" />
            <span className="text-sm">${items?.price}</span>
          </span>
        </div>
        <div className="relative h-full min-w-20">
          <NextImage
            src={`${productImageBaseUrl}${items?.image}`}
            alt={items?.name}
            className="object-cover rounded-r-md"
          />
        </div>
      </div>
    </>
  );
};

export default MenuCard;
