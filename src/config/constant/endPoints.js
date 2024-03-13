import { baseID } from "./index";

const buildEndpointWithID = (endpoint) => `${endpoint}?restaurant_id=${baseID}`;

// *Auth endpoints
export const LOGIN_ENDPOINT = "/auth/login";
export const CHECK_PHONE_ENDPOINT = "/auth/check-phone";
export const VERIFY_PHONE_ENDPOINT = "/auth/verify-phone";
export const REGISTER_ENDPOINT = "/auth/registration";
export const UPDATE_PROFILE_ENDPOINT = "/customer/update-profile";
export const SEND_OTP_ENDPOINT = "/auth/send-otp";
export const VERIFY_USER_ENDPOINT = "/auth/verify-login-by-web-app";
export const GET_USER_INFO_ENDPOINT = "/customer/info";

// *Config endpoints
export const GET_CONFIG_ENDPOINT = buildEndpointWithID("/config");

// *Menu Page endpoints
export const GET_CATEGORIES_LIST_ENDPOINT = buildEndpointWithID("/categories");
export const GET_ALL_POPULAR_ENDPOINT = buildEndpointWithID(
  "/products/allpopular"
);
export const GET_ALL_CATEGORIES_DATA_ENDPOINT = `/categories/allproducts/${baseID}`;
export const GET_RECOMMENDED_BEVERAGES_ENDPOINT = buildEndpointWithID(
  "/products/get_recomended_beverages"
);
export const GET_RECOMMENDED_SIDES_ENDPOINT = buildEndpointWithID(
  "/products/get_recomended_sides"
);

// *Orders Page endpoints
export const GET_ORDERS_LIST_ENDPOINT = "/customer/order/list";
export const GET_ORDER_DETAILS_ENDPOINT = "/customer/order/details";
export const ORDER_TRACK_DETAILS_ENDPOINT = buildEndpointWithID(
  "/customer/order/track"
);
// export const PLACE_ORDER_ENDPOINT = "/customer/order/place";
export const PLACE_ORDER_ENDPOINT = "/customer/order/place-by-web-app";

// *Others Pages endpoints
export const GET_REWARDS_LIST_ENDPOINT = buildEndpointWithID(
  "/products/loyalty-rewards"
);
export const GET_FAVORITES_LIST_ENDPOINT = "/customer/wish-list";
export const ADD_FAVORITE_ENDPOINT = "/customer/wish-list/add";
export const GET_COUPON_LIST_ENDPOINT = buildEndpointWithID("/coupon/list");
export const NEWS_LETTER_ENDPOINT = buildEndpointWithID(
  "/subscribe-newsletter"
);

// *Address Page endpoints
export const GET_ADDRESS_LIST_ENDPOINT = "/customer/address/list";
export const GET_ADDRESS_AUTO_PLACES_ENDPOINT =
  "/mapapi/place-api-autocomplete";
export const GET_ADDRESS_AUTO_PLACES_DETAILS_ENDPOINT =
  "/mapapi/place-api-details";
export const ADD_ADDRESS_ENDPOINT = "/customer/address/add";
export const UPDATE_ADDRESS_ENDPOINT = "/customer/address/update";
export const DELETE_ADDRESS_ENDPOINT = "/customer/address/delete";
export const CALCULATE_DISTANCE_ENDPOINT = "/mapapi/distance-api";

// *Cart Page endpoints
export const GET_CART_ENDPOINT = "/customer/paymentmethod/getPaymentCards";
export const CREATE_CART_ENDPOINT =
  "/customer/paymentmethod/createPaymentMethod";
export const DELETE_CART_ENDPOINT =
  "/customer/paymentmethod/deletePaymentMethods";
export const SET_DEFAULT_CART_ENDPOINT =
  "/customer/paymentmethod/setDefaultPaymentCard";
export const CREATE_PAYMENT_ENDPOINT = "/customer/order/create-payment";
export const GET_STRIPE_PAYMENT_INTENT = "/stripe/createPaymentIntent";
