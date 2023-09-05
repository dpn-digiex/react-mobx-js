import axiosClient from "@apis/axiosClient";
import { USER_API } from "@constants";

export const signInUser = async userInfo => {
  try {
    const response = await axiosClient.post(USER_API.SIGNIN, userInfo);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosClient.post(USER_API.LOGOUT);
    return response;
  } catch (error) {
    return error.response;
  }
};
