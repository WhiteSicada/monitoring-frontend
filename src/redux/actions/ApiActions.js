import APIService from "../../services/APIService";
import { ADD_API, DELETE_API, GET_APIs, UPDATE_API } from "../types/ApiTypes";

export const createAPI = (api) => async (dispatch) => {
	try {
		const response = await APIService.createAPI(api);
		dispatch({
			type: ADD_API,
			payload: response.data,
		});
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getAPIs = () => async (dispatch) => {
	try {
		const apis = await APIService.getAPIs();
		dispatch({
			type: GET_APIs,
			payload: apis.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const deleteAPI = (id) => async (dispatch) => {
	try {
		await APIService.deleteAPI(id);
		dispatch({
			type: DELETE_API,
			payload: { id },
		});
	} catch (error) {
		console.log(error);
	}
};

export const updateAPI = (id, api) => async (dispatch) => {
	try {
		const response = await APIService.updateAPI(id, api);
		dispatch({
			type: UPDATE_API,
			payload: api,
		});
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};
