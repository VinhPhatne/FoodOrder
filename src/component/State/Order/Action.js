import { api } from "../../config/api";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_USERS_NOTIFICATION_FAILURE,
  GET_USERS_NOTIFICATION_REQUEST,
  GET_USERS_NOTIFICATION_SUCCESS,
  GET_USERS_ORDERS_FAILURE,
  GET_USERS_ORDERS_REQUEST,
  GET_USERS_ORDERS_SUCCESS,
} from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const { data } = await api.post(`/api/order`, reqData.order, {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
      },
    });
    if(data.payment_url) {
        window.location.href = data.payment_url
    }
    console.log("createOrder", data);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    console.log("createOrder error", error);
    dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
  }
};

export const getUsersOrders = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USERS_ORDERS_REQUEST });
  try {
    const { data } = await api.get(`/api/order/user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("getUsersOrders", data);

    dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: error.message });
  }
};

export const getUsersNotificationAction = () => async (dispatch) => {
  dispatch({ type: GET_USERS_NOTIFICATION_REQUEST });
  try {
    const { data } = await api.get(`/api/notifications`);
    console.log("getUsersNotificationAction", data);

    dispatch({ type: GET_USERS_NOTIFICATION_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_USERS_NOTIFICATION_FAILURE, payload: error.message });
  }
};
