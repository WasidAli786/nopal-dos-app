import { cookies } from "next/headers";

export function getApiHeaders() {
  const token = cookies().get("token")?.value;

  if (token) {
    return {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      Authorization: `Bearer ${token}`,
    };
  }

  // Handle the case where the token is not available
  return {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  };
}
