import { api } from "../../config/api";
import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  CLEAR_CART_FAILURE,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  FIND_CART_FAILURE,
  FIND_CART_REQUEST,
  FIND_CART_SUCCESS,
  GET_ALL_CART_ITEMS_FAILURE,
  GET_ALL_CART_ITEMS_REQUEST,
  GET_ALL_CART_ITEMS_SUCCESS,
  REMOVE_CARTITEM_FAILURE,
  REMOVE_CARTITEM_REQUEST,
  REMOVE_CARTITEM_SUCCESS,
  UPDATE_CARTITEM_FAILURE,
  UPDATE_CARTITEM_REQUEST,
  UPDATE_CARTITEM_SUCCESS,
} from "./ActionType";

export const findCart = (token) => async (dispatch) => {
  dispatch({ type: FIND_CART_REQUEST });
  try {
    const { data } = await api.get(`/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("findCart", data);

    dispatch({ type: FIND_CART_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FIND_CART_FAILURE,
      payload: error.message,
    });
  }
};

export const getAllCartItems = (reqData) => async (dispatch) => {
  dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });
  try {
    const { data } = await api.get(`/api/carts/${reqData.cartId}/items`, {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
      },
    });
    console.log("getAllCartItems", data);

    dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error.message });
  }
};

export const addItemToCart = (reqData) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
  try {
    const { data } = await api.put(`/api/cart/add`, reqData.cartItem, {
      headers: {
        Authorization: `Bearer ${reqData.token}`,
      },
    });
    console.log("addItemToCart", data);

    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
  }
};

export const updateCartItem = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_CARTITEM_REQUEST });
  try {
    const { data } = await api.put(`/api/cart-item/update`, reqData.data, {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
      },
    });
    console.log("updateCartItem", data);

    dispatch({ type: UPDATE_CARTITEM_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_CARTITEM_FAILURE, payload: error.message });
  }
};

export const removeCartItem =
  ({ cartItemId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: REMOVE_CARTITEM_REQUEST });
    try {
      const { data } = await api.delete(`/api/cart-item/${cartItemId}/remove`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("removeCartItem", data);

      dispatch({ type: REMOVE_CARTITEM_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: REMOVE_CARTITEM_FAILURE, payload: error.message });
    }
  };

export const clearCartAction = () => async (dispatch) => {
  dispatch({ type: CLEAR_CART_REQUEST });
  try {
    const { data } = await api.put(
      `/api/cart/clear`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    console.log("clearCartAction", data);

    dispatch({ type: CLEAR_CART_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: CLEAR_CART_FAILURE, payload: error.message });
  }
};
