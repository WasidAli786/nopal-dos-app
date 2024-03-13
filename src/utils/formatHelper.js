export function formatPhoneNumber(phoneNumber) {
  const cleaned = ("" + phoneNumber).replace(/\D/g, ""); // Remove non-numeric characters

  const format = "(XXX) XXX-XXXX";

  let index = 0;
  const formattedNumber = format.replace(/X/g, () => cleaned[index++] || "");

  return formattedNumber;
}

export function unFormatPhoneNumber(formattedPhoneNumber) {
  const cleaned = formattedPhoneNumber.replace(/\D/g, "");
  const plainPhoneNumber = "+" + cleaned;
  return plainPhoneNumber;
}
