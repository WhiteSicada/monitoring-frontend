import { combineReducers } from "redux";
import ItResponsableReducer from "./ItResponsableReducer";
import TeamReducer from "./TeamReducer";
import WorkResponsableReducer from "./WorkResponsableReducer";


const RootReducer = combineReducers({
	teamState : TeamReducer,
	itResponsableState : ItResponsableReducer,
	workResponsableState : WorkResponsableReducer
});

export default RootReducer;
