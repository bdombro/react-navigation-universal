import {ActionTypes} from "./actionTypes";
import {Auth} from "../reducers";

export interface SetAuthAction {
    type: ActionTypes.setAuth;
    payload: Auth;
}

export interface ResetAuthAction {
    type: ActionTypes.resetAuth;
    payload: Auth;
}

export const setAuth = (auth: Auth) => ({
    type: ActionTypes.setAuth,
    payload: auth,
});

export const resetAuth = () => ({
    type: ActionTypes.resetAuth,
    payload: {userId: "", token: "", roles: []},
});
