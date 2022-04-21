import { combineReducers } from "redux";
import UserReducer from "./userReducers";
const rootReducer = combineReducers({
    UserReducer,
});

export default rootReducer;
