import OrdersTab from "@/components/modules/orders/OrdersTab";
import { getAllOrdersList } from "@/config/api/server/order.api";

async function OrdersMain() {
  const allOrdersList = await getAllOrdersList();

  return (
    <>
      <div className="container mt-10">
        <div className="p-5 md:p-10 rounded-2xl bgSecondary_lightDark border_lightDark">
          <h1 className="text-center primary_title">Orders</h1>
          <div className="mt-5 md:mt-10">
            <OrdersTab allOrdersList={allOrdersList} />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersMain;
