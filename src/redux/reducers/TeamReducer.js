import {
	ADD_TEAM,
	GET_TEAMS,
	SET_TEAM,
	UPDATE_TEAM,
	DELETE_TEAM,
} from "../types/teamActionTypes";

const initialState = {
	team: {},
	teams: [],
};

function TeamReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ADD_TEAM:
			return Object.assign({}, state, {
				teams: state.teams.concat(payload),
			});

		case GET_TEAMS:
			return Object.assign({}, state, {
				teams: payload,
			});

		case DELETE_TEAM:
			return Object.assign({}, state, {
				teams: state.teams.filter((team) => team.id !== payload.id),
			});

		case SET_TEAM:
			return Object.assign({}, state, {
				team: payload,
			});

		default:
			return state;
	}
}

export default TeamReducer;
