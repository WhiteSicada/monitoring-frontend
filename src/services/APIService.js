import { customAxios } from "./customAxios";

const createAPI = (api) => {
	return customAxios.post("/api", api);
};

const getAPIs = () => {
	return customAxios.get("/apis");
};

const deleteAPI = (id) => {
	return customAxios.delete(`/api/${id}`);
};

const updateAPI = (id, api) => {
	return customAxios.put(`/api/${id}`, api);
};

const addEndpointsToApi = (id, endpoints) => {
	return customAxios.put(`/api/${id}/addEndpoints`, endpoints);
};

const removeEndpointsToApi = (id, endpoints) => {
	return customAxios.put(`/api/${id}/removeEndpoints`, endpoints);
};

const updateEndpointsForApi = (id, endpoints) => {
	return customAxios.put(`/api/${id}/updateEndpoints`, endpoints);
};

const APIService = {
	createAPI,
	getAPIs,
	deleteAPI,
	updateAPI,
	addEndpointsToApi,
	removeEndpointsToApi,
	updateEndpointsForApi,
};

export default APIService;
