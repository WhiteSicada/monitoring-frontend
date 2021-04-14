import { ADD_API, DELETE_API, GET_APIs, UPDATE_API } from "../types/ApiTypes";

const initialState = {
	apis: [],
};

function ApiReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ADD_API:
			return Object.assign({}, state, {
				apis: state.apis.concat(payload),
			});

		case GET_APIs:
			return Object.assign({}, state, {
				apis: payload,
			});

		case DELETE_API:
			return Object.assign({}, state, {
				apis: state.apis.filter((api) => api.id !== payload.id),
			});

		case UPDATE_API:
			return Object.assign({}, state, {
				apis: state.apis.map((api) => {
					if (api.id === payload.id) {
						return { ...api, ...payload };
					}
					return api;
				}),
			});

		default:
			return state;
	}
}

export default ApiReducer;
