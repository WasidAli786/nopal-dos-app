import CartButton from "@/components/common/CartButton";
import { useStore } from "@/store/store";
import { slugify } from "@/utils/slugify";
import { useRouter } from "next/navigation";

const MenuCheckoutCard = ({ items }) => {
  const router = useRouter();
  const { setMenuDetailsData } = useStore();

  const handleShowMenuDetails = (menuData) => {
    setMenuDetailsData(menuData);
    router.push(`/menu/${slugify(menuData?.name)}/${menuData?.id}`);
  };
  return (
    <>
      <div className="py-6">
        <h5 className="font-semibold">{items?.name}</h5>
        <div className="flex items-center justify-between mt-2">
          <span
            className="text-sm underline cursor-pointer"
            onClick={() => handleShowMenuDetails(items)}
          >
            Edit
          </span>
          <div className="flex items-center gap-2">
            <h5>${items?.price * items?.quantity}</h5>
            <div className="flex items-center justify-center h-10 px-2 border rounded border_lightDark bg-background">
              <CartButton items={items} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuCheckoutCard;
