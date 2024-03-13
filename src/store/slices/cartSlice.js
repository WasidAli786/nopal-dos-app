import { useLocalStorage } from "@/hooks/useLocalStorage";
import { successToast } from "@/utils/toaster";

const { getStorageItem, setStorageItem, removeStorageItem } = useLocalStorage();

const getCurrentBranch = getStorageItem("currentBranch");
const cartItems = getStorageItem("cart") ?? [];
const menuDetailsItem = getStorageItem("menuDetailsItem") ?? {};
const isAlreadyInCart = cartItems?.length
  ? cartItems?.map((items) => items?.id)
  : [];

const totalAmount = cartItems?.length
  ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  : 0;

export const cartSlice = (set) => ({
  configData: {},
  currentBranch: getCurrentBranch,
  menuDetailsData: menuDetailsItem,
  placeOrderPayload: getStorageItem("checkoutItems") ?? {},
  cartItems: cartItems,
  isAlreadyInCart: isAlreadyInCart,
  totalAmount: totalAmount,
  menuDetailAmount: menuDetailsItem?.price,
  menuDetailQty: menuDetailsItem?.quantity,

  setConfigData: (data) => set({ configData: data }),

  setCurrentBranch: (data) =>
    set(() => {
      setStorageItem("currentBranch", data);
      return { currentBranch: data };
    }),

  setRemoveCurrentBranch: () =>
    set(() => {
      removeStorageItem("currentBranch");
      return { currentBranch: null };
    }),

  setPlaceOrderPayload: (data) =>
    set((state) => {
      const placeOrderData = { ...state.placeOrderPayload, ...data };
      setStorageItem("checkoutItems", placeOrderData);
      return { placeOrderPayload: placeOrderData };
    }),

  setMenuDetailsData: (data) =>
    set(() => {
      setStorageItem("menuDetailsItem", data);
      return {
        menuDetailsData: data,
        menuDetailAmount: data?.price,
        menuDetailQty: 1,
      };
    }),
  removeMenuDetailsData: (data) =>
    set(() => {
      removeStorageItem("menuDetailsItem");
      return { menuDetailsData: data };
    }),

  addToCart: (cartData, isCartToggle) =>
    set((state) => {
      const existingCartItem = state.cartItems.find(
        (item) => item.id === cartData.id
      );

      if (isCartToggle) {
        if (existingCartItem) {
          const updatedCartItems = state.cartItems.filter(
            (item) => item.id !== cartData.id
          );

          const updatedTotalAmount =
            state.totalAmount - cartData.price * existingCartItem?.quantity;

          const allCartIds = state.isAlreadyInCart.filter(
            (item) => item !== cartData.id
          );

          setStorageItem("cart", updatedCartItems);
          successToast("Item removed from the cart");

          return {
            cartItems: updatedCartItems,
            isAlreadyInCart: allCartIds,
            totalAmount: updatedTotalAmount,
          };
        }
      } else {
        if (existingCartItem) {
          const updatedCartItems = state.cartItems.map((item) =>
            item.id === existingCartItem.id
              ? {
                  ...item,
                  quantity: item.quantity + (cartData.quantity ?? 1),
                  choice_options: cartData?.choice_options,
                }
              : item
          );

          const updatedTotalAmount =
            state.totalAmount + cartData.price * (cartData.quantity ?? 1);

          setStorageItem("cart", updatedCartItems);
          successToast("Item quantity updated in the cart");

          return {
            cartItems: updatedCartItems,
            isAlreadyInCart: state.isAlreadyInCart,
            totalAmount: updatedTotalAmount,
          };
        }
      }

      // If the product is not in the cart, add a new item
      const updatedCartItems = [
        ...state.cartItems,
        { ...cartData, quantity: cartData?.quantity ?? 1 },
      ];
      const allCartIds = [...state.isAlreadyInCart, cartData.id];
      let totalAmount;
      if (cartData?.quantity) {
        totalAmount = state.totalAmount + cartData.price * cartData?.quantity;
      } else {
        totalAmount = state.totalAmount + cartData.price;
      }

      setStorageItem("cart", updatedCartItems);
      successToast("Item added to the cart");

      return {
        cartItems: updatedCartItems,
        isAlreadyInCart: allCartIds,
        totalAmount: totalAmount,
      };
    }),

  // addToCart: (cartData) =>
  //   set((state) => {
  //     const existingCartItem = state.cartItems.find(
  //       (item) => item.id === cartData.id
  //     );

  //     if (existingCartItem) {
  //       const updatedCartItems = state.cartItems.map((item) =>
  //         item.id === existingCartItem.id
  //           ? {
  //               ...item,
  //               quantity: item.quantity + (cartData.quantity ?? 1),
  //               choice_options: cartData?.choice_options,
  //             }
  //           : item
  //       );

  //       const updatedTotalAmount =
  //         state.totalAmount + cartData.price * (cartData.quantity ?? 1);

  //       setStorageItem("cart", updatedCartItems);
  //       successToast("Item quantity updated in the cart");

  //       return {
  //         cartItems: updatedCartItems,
  //         isAlreadyInCart: state.isAlreadyInCart,
  //         totalAmount: updatedTotalAmount,
  //       };
  //     }

  //     // If the product is not in the cart, add a new item
  //     const updatedCartItems = [
  //       ...state.cartItems,
  //       { ...cartData, quantity: cartData?.quantity ?? 1 },
  //     ];
  //     const allCartIds = [...state.isAlreadyInCart, cartData.id];
  //     let totalAmount;
  //     if (cartData?.quantity) {
  //       totalAmount = state.totalAmount + cartData.price * cartData?.quantity;
  //     } else {
  //       totalAmount = state.totalAmount + cartData.price;
  //     }

  //     setStorageItem("cart", updatedCartItems);
  //     successToast("Item added to the cart");

  //     return {
  //       cartItems: updatedCartItems,
  //       isAlreadyInCart: allCartIds,
  //       totalAmount: totalAmount,
  //     };
  //   }),
  removeFromCart: (cartData) =>
    set((state) => {
      const filterItems = state.cartItems.filter(
        (items) => items.id !== cartData.id
      );
      const filterIds = state.isAlreadyInCart.filter(
        (items) => items !== cartData.id
      );
      const totalAmount = state.totalAmount - cartData.price;
      setStorageItem("cart", filterItems);
      return {
        cartItems: filterItems,
        isAlreadyInCart: filterIds,
        totalAmount: totalAmount,
      };
    }),
  increaseQuantity: (itemId) =>
    set((state) => {
      const updatedCartItems = state.cartItems.map((items) =>
        items.id === itemId ? { ...items, quantity: items.quantity + 1 } : items
      );
      const updatedTotalAmount = updatedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      setStorageItem("cart", updatedCartItems);
      return { cartItems: updatedCartItems, totalAmount: updatedTotalAmount };
    }),
  decreaseQuantity: (itemId) =>
    set((state) => {
      const updatedCartItems = state.cartItems
        .map((items) =>
          items.id === itemId
            ? { ...items, quantity: items.quantity - 1 }
            : items
        )
        .filter((item) => {
          if (item.quantity <= 0) {
            successToast("Item removed from the cart");
            return false;
          }
          return true;
        });
      const filterIds = updatedCartItems.map((items) => items.id);
      const updatedTotalAmount = updatedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      setStorageItem("cart", updatedCartItems);
      return {
        cartItems: updatedCartItems,
        isAlreadyInCart: filterIds,
        totalAmount: updatedTotalAmount,
      };
    }),
  incMenuDetailQty: (cartData) => {
    set((state) => {
      const updatedQty = state.menuDetailQty + 1;
      const updatedMenuDetailAmount = cartData?.price * updatedQty;
      return {
        menuDetailQty: updatedQty,
        menuDetailAmount: updatedMenuDetailAmount,
      };
    });
  },
  decMenuDetailQty: (cartData) =>
    set((state) => {
      const updatedQty = state.menuDetailQty > 1 ? state.menuDetailQty - 1 : 1;
      const updatedMenuDetailAmount = cartData?.price * updatedQty;
      return {
        menuDetailQty: updatedQty,
        menuDetailAmount: updatedMenuDetailAmount,
      };
    }),
  resetCart: () =>
    set(() => {
      removeStorageItem("cart");
      removeStorageItem("menuDetailsItem");
      return {
        cartItems: [],
        isAlreadyInCart: [],
        totalAmount: 0,
        quantity: 1,
      };
    }),
});
