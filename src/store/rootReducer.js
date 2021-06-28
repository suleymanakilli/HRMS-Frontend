
import { combineReducers } from "redux";
import updateUserReducer from "./reducers/updateUserReducer";


const rootReducer = combineReducers({
    user :updateUserReducer
})

export default rootReducer;