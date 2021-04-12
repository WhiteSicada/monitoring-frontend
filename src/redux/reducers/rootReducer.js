import { combineReducers } from "redux";
import TeamReducer from "./TeamReducer";
// import PokemonMultipleReducer from "./PokemonMultipleReducer";

const RootReducer = combineReducers({
	teamState : TeamReducer,
	// Pokemon : PokemonMultipleReducer
});

export default RootReducer;
