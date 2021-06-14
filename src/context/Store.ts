import { combineReducers, createStore, applyMiddleware
 } from "redux";
import UserReducer from "./reducers/UserReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";


const middleware = applyMiddleware(thunk)

const combinedReducers = combineReducers({
    users: UserReducer,
})

export const store = createStore(combinedReducers, composeWithDevTools(middleware))