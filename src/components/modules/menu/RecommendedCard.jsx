import { Checkbox, cn } from "@nextui-org/react";
import NextImage from "@/components/common/NextImage";
import { useStore } from "@/store/store";
import { getProductImageBaseUrl } from "@/utils/imagesPath";

const RecommendedCard = ({ items }) => {
  const productImageBaseUrl = getProductImageBaseUrl();
  const isCartToggle = true;
  const { addToCart } = useStore();

  return (
    <>
      <Checkbox
        aria-label={items?.name}
        classNames={{
          base: cn(
            "max-w-full m-0 hover:bg-primary-100 dark:hover:bg-content2",
            "cursor-pointer rounded-lg gap-2 border-2 border-transparent",
            "data-[selected=true]:border-primary"
          ),
          label: "w-full",
        }}
        value={items?.id}
        onValueChange={() => addToCart(items, isCartToggle)}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="relative h-14 min-w-14">
              <NextImage
                src={`${productImageBaseUrl}${items?.image}`}
                alt={items?.name}
                className="object-cover rounded-md"
              />
            </div>
            <h3>{items?.name}</h3>
          </div>
          <h3>$ {items?.price}</h3>
        </div>
      </Checkbox>
    </>
  );
};

export default RecommendedCard;
