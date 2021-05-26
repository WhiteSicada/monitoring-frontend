import {
	ADD_API,
	DELETE_API,
	GET_APIs,
	UPDATE_API,
	ADD_ENDPOINT_TO_API,
	REMOVE_ENDPOINT_TO_API,
	UPDATE_ENDPOINTS_OF_API,
} from "../types/ApiTypes";

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

		case ADD_ENDPOINT_TO_API:
			return Object.assign({}, state, {
				apis: state.apis.map((api) => {
					if (api.id === payload.id) {
						return { ...api, ...payload };
					}
					return api;
				}),
			});

		case REMOVE_ENDPOINT_TO_API:
			return Object.assign({}, state, {
				apis: state.apis.map((api) => {
					if (api.id === payload.id) {
						return {
							...api,
							endpoints: api.endpoints.filter(
								(element) => payload.data.endpoints.indexOf(element.id) === -1
							),
						};
					}
					return api;
				}),
			});

		case UPDATE_ENDPOINTS_OF_API:
			return Object.assign({}, state, {
				apis: state.apis.map((api) => {
					if (api.id === payload.id) {
						payload.data.endpoints.map((updatedEndpoint) => {
							const index = api.endpoints.findIndex(
								(el) => el.id === updatedEndpoint.id
							);
							api.endpoints[index] = updatedEndpoint;
						});
					}
					return api;
				}),
			});

		default:
			return state;
	}
}

export default ApiReducer;
