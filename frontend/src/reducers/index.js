import { combineReducers } from "redux";
import { parties } from './parties';
import { auth } from './auth'

export const reducer = combineReducers({
    parties,
    auth
});