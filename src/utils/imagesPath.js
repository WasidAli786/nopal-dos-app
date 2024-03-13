"use client";

import { useStore } from "@/store/store";

export function getProductImageBaseUrl() {
  const { configData } = useStore();
  // return `${configData?.base_urls?.product_image_url}/`;
  return `https://storage.googleapis.com/cafescale_restaurants_backend_bucket/product/restaurant_id_47/`;
}

export function getUserImageBaseUrl() {
  const { configData } = useStore();
  return `${configData?.base_urls?.customer_image_url}/`;
}
