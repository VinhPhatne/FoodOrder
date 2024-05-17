import { api } from "../../config/api";
import {
  CREATE_INGREDIENT_CATEGORY_FAILURE,
  CREATE_INGREDIENT_CATEGORY_SUCCESS,
  CREATE_INGREDIENT_FAILURE,
  CREATE_INGREDIENT_SUCCESS,
  GET_INGREDIENTS,
  GET_INGREDIENT_CATEGORY_SUCCESS,
  UPDATE_STOCK,
} from "./ActionType";

export const getIngredientsOfRestaurant =
  ({ id, jwt }) =>
  async (dispatch) => {
    try {
      const { data } = await api.get(
        `/api/admin/ingredients/restaurant/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("getIngredientsOfRestaurant", data);

      dispatch({ type: GET_INGREDIENTS, payload: data });
    } catch (error) {
      console.log("error", error);
    }
  };

export const createIngredient =
  ({ data, jwt }) =>
  async (dispatch) => {
    try {
      const response = await api.post(`/api/admin/ingredients`, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("createIngredient", response.data);
      dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: CREATE_INGREDIENT_FAILURE, payload: error.message });
    }
  };

export const createIngredientCategory =
  ({ data, jwt }) =>
  async (dispatch) => {
    try {
      const response = await api.post(`/api/admin/ingredients/category`, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("createIngredientCategory", response.data);
      dispatch({
        type: CREATE_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CREATE_INGREDIENT_CATEGORY_FAILURE,
        payload: error.message,
      });
    }
  };

export const getIngredientCategory =
  ({ id, jwt }) =>
  async (dispatch) => {
    try {
      const { data } = await api.get(
        `/api/admin/ingredients/restaurant/${id}/category`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("getIngredientCategory", data);

      dispatch({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
      console.log("error", error);
    }
  };

export const updateStockOfIngredient =
  ({ id, jwt }) =>
  async (dispatch) => {
    try {
      const { data } = await api.put(
        `/api/admin/ingredients/${id}/stoke`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("updateStockOfIngredient", data);

      dispatch({ type: UPDATE_STOCK, payload: data });
    } catch (error) {
      console.log("error", error);
    }
  };
