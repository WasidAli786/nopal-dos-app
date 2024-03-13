import {
  ADD_FAVORITE_ENDPOINT,
  CHECK_PHONE_ENDPOINT,
  GET_ADDRESS_LIST_ENDPOINT,
  GET_CONFIG_ENDPOINT,
  GET_FAVORITES_LIST_ENDPOINT,
  GET_ORDER_DETAILS_ENDPOINT,
  GET_ADDRESS_AUTO_PLACES_ENDPOINT,
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
  UPDATE_PROFILE_ENDPOINT,
  VERIFY_PHONE_ENDPOINT,
  ADD_ADDRESS_ENDPOINT,
  GET_ADDRESS_AUTO_PLACES_DETAILS_ENDPOINT,
  UPDATE_ADDRESS_ENDPOINT,
  DELETE_ADDRESS_ENDPOINT,
  GET_CART_ENDPOINT,
  CREATE_CART_ENDPOINT,
  DELETE_CART_ENDPOINT,
  SET_DEFAULT_CART_ENDPOINT,
  PLACE_ORDER_ENDPOINT,
  ORDER_TRACK_DETAILS_ENDPOINT,
  NEWS_LETTER_ENDPOINT,
  CALCULATE_DISTANCE_ENDPOINT,
  SEND_OTP_ENDPOINT,
  VERIFY_USER_ENDPOINT,
  GET_USER_INFO_ENDPOINT,
  GET_STRIPE_PAYMENT_INTENT,
  CREATE_PAYMENT_ENDPOINT,
} from "../constant/endPoints";
import { get, post, put, del } from "./api.request";

const Services = {
  login: (data) => {
    return post(LOGIN_ENDPOINT, data);
  },
  checkPhone: (data) => {
    return post(CHECK_PHONE_ENDPOINT, data);
  },
  verifyPhone: (data) => {
    return post(VERIFY_PHONE_ENDPOINT, data);
  },
  createAccount: (data) => {
    return post(REGISTER_ENDPOINT, data);
  },
  updateProfile: (data) => {
    return put(UPDATE_PROFILE_ENDPOINT, data);
  },
  sendOtpForVerification: (data) => {
    return post(SEND_OTP_ENDPOINT, data);
  },
  verifyUserForAuthentication: (data) => {
    return post(VERIFY_USER_ENDPOINT, data);
  },
  getUserInfo: () => {
    return get(GET_USER_INFO_ENDPOINT);
  },
  getAllConfigData: () => {
    return get(GET_CONFIG_ENDPOINT);
  },
  getOrderDetails: (orderID) => {
    return get(`${GET_ORDER_DETAILS_ENDPOINT}?order_id=${orderID}`);
  },
  getOrderTrackDetails: (orderID) => {
    return get(`${ORDER_TRACK_DETAILS_ENDPOINT}&order_id=${orderID}`);
  },
  placeOrder: (data) => {
    return post(PLACE_ORDER_ENDPOINT, data);
  },
  getFavoritesList: () => {
    return get(GET_FAVORITES_LIST_ENDPOINT);
  },
  addWishlist: (id) => {
    return post(ADD_FAVORITE_ENDPOINT, id);
  },
  getAddressList: () => {
    return get(GET_ADDRESS_LIST_ENDPOINT);
  },
  getAddressAutoPlacesList: (searchQuery) => {
    return get(
      `${GET_ADDRESS_AUTO_PLACES_ENDPOINT}?search_text=${searchQuery}`
    );
  },
  getAddressAutoPlacesDetail: (placeId) => {
    return get(
      `${GET_ADDRESS_AUTO_PLACES_DETAILS_ENDPOINT}?placeid=${placeId}`
    );
  },
  addAddress: (data) => {
    return post(ADD_ADDRESS_ENDPOINT, data);
  },
  updateAddress: (id, data) => {
    return put(`${UPDATE_ADDRESS_ENDPOINT}/${id}`, data);
  },
  deleteAddress: (id) => {
    return del(`${DELETE_ADDRESS_ENDPOINT}?address_id=${id}`);
  },
  getDistance: (data) => {
    return get(
      `${CALCULATE_DISTANCE_ENDPOINT}?origin_lat=${data?.origin_lat}&origin_lng=${data?.origin_lng}&destination_lat=${data?.destination_lat}&destination_lng=${data?.destination_lng}`
    );
  },
  getCartList: () => {
    return post(GET_CART_ENDPOINT);
  },
  createCart: (data) => {
    return post(CREATE_CART_ENDPOINT, data);
  },
  deleteCart: (id) => {
    return post(DELETE_CART_ENDPOINT, id);
  },
  setDefaultCart: (id) => {
    return post(SET_DEFAULT_CART_ENDPOINT, id);
  },
  createNewsLetter: (data) => {
    return post(NEWS_LETTER_ENDPOINT, data);
  },
  createPayment: (data) => {
    return post(CREATE_PAYMENT_ENDPOINT, data);
  },
  getStripePaymentIntent: () => {
    return post(GET_STRIPE_PAYMENT_INTENT);
  },
};
export default Services;
