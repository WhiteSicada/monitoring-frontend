import { combineReducers } from "redux";
import ApiReducer from "./ApiReducer";
import ItResponsableReducer from "./ItResponsableReducer";
import TeamReducer from "./TeamReducer";
import WorkResponsableReducer from "./WorkResponsableReducer";


const RootReducer = combineReducers({
	teamState : TeamReducer,
	itResponsableState : ItResponsableReducer,
	workResponsableState : WorkResponsableReducer,
	apiState : ApiReducer
});

export default RootReducer;
