import { getFixedValue } from "./index";

export function getTaxAmount(cartItems, taxPercentage) {
  const totalTaxAmount = cartItems?.reduce((accumulator, item) => {
    const taxAmountPerItem = item.price * (taxPercentage / 100);
    const itemTotalTax = taxAmountPerItem * item.quantity;
    return accumulator + itemTotalTax;
  }, 0);

  return getFixedValue(totalTaxAmount);
}

export function getTipAmount(cartItems, staffTipAmount, staffOtherAmount) {
  const finalValue = !cartItems?.length
    ? 0
    : staffTipAmount === "Other"
    ? staffOtherAmount
    : staffTipAmount;
  return getFixedValue(finalValue);
}

export function getAllTotalAmount(
  totalAmount,
  deliveryFee,
  totalTaxAmount,
  tipAmount
) {
  const allTotal =
    Number(totalAmount) +
    Number(deliveryFee) +
    Number(totalTaxAmount) +
    Number(tipAmount);
  return getFixedValue(allTotal);
}
