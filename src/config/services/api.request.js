import Axios from "./axios.service";

// get request
export const get = async (url) => {
  try {
    const response = await Axios.get(url);
    return response.data;
  } catch (error) {
    throw error?.response?.data?.errors[0]?.message;
  }
};

// post request
export const post = async (url, data) => {
  try {
    const response = await Axios.post(url, data);
    return response.data;
  } catch (error) {
    throw error?.response?.data?.errors[0]?.message;
  }
};

// put request
export const put = async (url, data) => {
  try {
    const response = await Axios.put(url, data);
    return response.data;
  } catch (error) {
    throw error?.response?.data?.errors[0]?.message;
  }
};

// delete request
export const del = async (url) => {
  try {
    const response = await Axios.delete(url);
    return response.data;
  } catch (error) {
    throw error?.response?.data?.errors[0]?.message;
  }
};
