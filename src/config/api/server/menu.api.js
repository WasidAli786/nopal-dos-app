import { baseURL } from "@/config/constant";
import {
  GET_ALL_CATEGORIES_DATA_ENDPOINT,
  GET_ALL_POPULAR_ENDPOINT,
  GET_CATEGORIES_LIST_ENDPOINT,
  GET_CONFIG_ENDPOINT,
  GET_RECOMMENDED_BEVERAGES_ENDPOINT,
  GET_RECOMMENDED_SIDES_ENDPOINT,
} from "@/config/constant/endPoints";

export async function getAllConfigDataRequest() {
  const res = await fetch(`${baseURL}${GET_CONFIG_ENDPOINT}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getAllCategoriesList() {
  const res = await fetch(`${baseURL}${GET_CATEGORIES_LIST_ENDPOINT}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getAllPopularItems() {
  const res = await fetch(`${baseURL}${GET_ALL_POPULAR_ENDPOINT}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getAllCategoriesData() {
  const res = await fetch(`${baseURL}${GET_ALL_CATEGORIES_DATA_ENDPOINT}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getRecommendedBeveragesData() {
  const res = await fetch(`${baseURL}${GET_RECOMMENDED_BEVERAGES_ENDPOINT}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getRecommendedSidesData() {
  const res = await fetch(`${baseURL}${GET_RECOMMENDED_SIDES_ENDPOINT}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
