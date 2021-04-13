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

const APIService = {
	createAPI,
	getAPIs,
	deleteAPI,
	updateAPI,
};

export default APIService;
