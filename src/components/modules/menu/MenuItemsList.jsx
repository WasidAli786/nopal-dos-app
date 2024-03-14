import Services from "@/config/services";
import { useQuery } from "@tanstack/react-query";
import CategoryCard from "./CategoryCard";
import SpinnerUI from "@/components/common/SpinnerUI";

const MenuItemsList = () => {
  const { data: allCategoriesData, isLoading } = useQuery({
    queryKey: ["menu"],
    queryFn: Services.getMenuList,
  });
  return (
    <>
      <div className="container">
        {isLoading ? (
          <SpinnerUI />
        ) : allCategoriesData?.length > 0 ? (
          allCategoriesData?.map((item) => {
            return (
              <div
                key={item?.id}
                data-section
                id={item?.name}
                className="mt-10"
              >
                <h2 className="text-xl font-bold">{item?.name}</h2>
                <div className="grid gap-6 mt-6 md:grid-cols-2 lg:gap-x-12">
                  {item?.products?.map((items) => (
                    <CategoryCard key={items?.id} items={items} />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default MenuItemsList;
