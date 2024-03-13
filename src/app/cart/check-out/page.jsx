import CheckoutModuleMain from "@/components/modules/cart/checkout/CheckoutModuleMain";
import { getAllPopularItems } from "@/config/api/server/menu.api";
import CartFormProvider from "@/config/provider/CartFormProvider";
import CartPaymentElementProvider from "@/config/provider/CartPaymentElementProvider";

async function CheckoutNewMain() {
  const response = await getAllPopularItems();
  return (
    <>
      <CartFormProvider>
        <CartPaymentElementProvider>
          <CheckoutModuleMain popularItems={response?.products} />
        </CartPaymentElementProvider>
      </CartFormProvider>
    </>
  );
}

export default CheckoutNewMain;
