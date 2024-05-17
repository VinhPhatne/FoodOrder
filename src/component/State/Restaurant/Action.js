import { api } from "../../config/api";
import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_EVENTS_FAILURE,
  CREATE_EVENTS_REQUEST,
  CREATE_EVENTS_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  DELETE_EVENTS_FAILURE,
  DELETE_EVENTS_REQUEST,
  DELETE_EVENTS_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_RESTAURANT_FAILURE,
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  GET_RESTAURANTS_EVENTS_FAILURE,
  GET_RESTAURANTS_EVENTS_REQUEST,
  GET_RESTAURANTS_EVENTS_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  GET_RESTAURANT_CATEGORY_FAILURE,
  GET_RESTAURANT_CATEGORY_REQUEST,
  GET_RESTAURANT_CATEGORY_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_SUCCESS,
} from "./ActionType";

export const getAllRestaurantsAction = (jwt) => async (dispatch) => {
  dispatch({ type: GET_ALL_RESTAURANT_REQUEST });
  try {
    const { data } = await api.get(`/api/restaurants`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    console.log("getAllRestaurantsAction", data);

    dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_ALL_RESTAURANT_FAILURE, payload: error.message });
  }
};

export const getRestaurantById = (reqData) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/restaurants/${reqData.restaurantId}`, {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
      },
    });
    console.log("getRestaurantById", data);

    dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error.message });
  }
};

export const getRestaurantByUserId = (jwt) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/admin/restaurants/user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("getRestaurantByUserId", data);

    dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_RESTAURANT_BY_USER_ID_FAILURE,
      payload: error.message,
    });
  }
};

export const createRestaurant = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_RESTAURANT_REQUEST });
  try {
    const { data } = await api.post(`/api/admin/restaurants`, reqData.data, {
      headers: {
        Authorization: `Bearer ${reqData.token}`,
      },
    });
    console.log("createRestaurant", data);

    dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
  } catch (error) {
    console.log("createRestaurant error", error);
    dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error.message });
  }
};

export const updateRestaurant =
  ({ restaurantId, restaurantData, jwt }) =>
  async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_REQUEST });
    try {
      const { data } = await api.put(
        `/api/admin/restaurant/${restaurantId}`,
        restaurantData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("updateRestaurant", data);

      dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error.message });
    }
  };

export const deleteRestaurant =
  ({ restaurantId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });
    try {
      const { data } = await api.delete(
        `/api/admin/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("deleteRestaurant", data);

      dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error.message });
    }
  };

export const updateRestaurantStatus =
  ({ restaurantId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
    try {
      const { data } = await api.put(
        `/api/admin/restaurants/${restaurantId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("updateRestaurantStatus", data);

      dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_RESTAURANT_STATUS_FAILURE,
        payload: error.message,
      });
    }
  };

export const createEventAction =
  ({ data, jwt, restaurantId }) =>
  async (dispatch) => {
    dispatch({ type: CREATE_EVENTS_REQUEST });
    try {
      const res = await api.post(
        `/api/admin/events/restaurant/${restaurantId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("createEventAction", res.data);

      dispatch({ type: CREATE_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: CREATE_EVENTS_FAILURE, payload: error.message });
    }
  };

export const getAllEvents =
  ({ jwt }) =>
  async (dispatch) => {
    dispatch({ type: GET_ALL_EVENTS_REQUEST });
    try {
      const { data } = await api.get(`/api/events`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("getAllEvents", data);

      dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: error.message });
    }
  };

export const deleteEventAction =
  ({ eventId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_EVENTS_REQUEST });
    try {
      const { data } = await api.delete(`/api/admin/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("deleteEventAction", data);

      dispatch({ type: DELETE_EVENTS_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: DELETE_EVENTS_FAILURE, payload: error.message });
    }
  };

export const getRestaurantsEvents =
  ({ restaurantId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });
    try {
      const { data } = await api.get(
        `/api/admin/events/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("getRestaurantsEvents", data);

      dispatch({ type: GET_RESTAURANTS_EVENTS_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_RESTAURANTS_EVENTS_FAILURE,
        payload: error.message,
      });
    }
  };

export const createCategoryAction =
  ({ req, jwt }) =>
  async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
      const { data } = await api.post(`/api/admin/category`, req, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("createCategoryAction", data);

      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error.message });
    }
  };

export const getRestaurantsCategory =
  ({ jwt, restaurantId }) =>
  async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_CATEGORY_REQUEST });
    try {
      const { data } = await api.get(
        `/api/category/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("getRestaurantsCategory", data);

      dispatch({ type: GET_RESTAURANT_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_RESTAURANT_CATEGORY_FAILURE,
        payload: error.message,
      });
    }
  };
