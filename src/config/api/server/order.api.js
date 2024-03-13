import { baseURL } from "@/config/constant";
import {
  GET_COUPON_LIST_ENDPOINT,
  GET_ORDERS_LIST_ENDPOINT,
  GET_REWARDS_LIST_ENDPOINT,
} from "@/config/constant/endPoints";
import { getApiHeaders } from "@/utils/requestHelpers";

export async function getAllOrdersList() {
  const res = await fetch(`${baseURL}${GET_ORDERS_LIST_ENDPOINT}`, {
    cache: "no-store",
    headers: getApiHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getRewardsList() {
  const res = await fetch(`${baseURL}${GET_REWARDS_LIST_ENDPOINT}`, {
    cache: "no-store",
    headers: getApiHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getCouponList() {
  const res = await fetch(`${baseURL}${GET_COUPON_LIST_ENDPOINT}`, {
    cache: "no-store",
    headers: getApiHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
