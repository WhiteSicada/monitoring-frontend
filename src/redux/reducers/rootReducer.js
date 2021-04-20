import { combineReducers } from "redux";
import ApiReducer from "./ApiReducer";
import ItResponsableReducer from "./ItResponsableReducer";
import TeamReducer from "./TeamReducer";
import WorkResponsableReducer from "./WorkResponsableReducer";
import ProjectReducer from "./ProjectReducer";


const RootReducer = combineReducers({
	teamState : TeamReducer,
	itResponsableState : ItResponsableReducer,
	workResponsableState : WorkResponsableReducer,
	apiState : ApiReducer,
	projectState : ProjectReducer
});

export default RootReducer;
