import { combineReducers } from "redux";
import authReducer from "store/reducers/authReducer";

const reducers = combineReducers({
  auth: authReducer,
});

export default reducers;
