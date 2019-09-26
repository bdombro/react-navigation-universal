import {ActionTypes} from "./actionTypes";
// import {Theme} from "../reducers";

export interface ToggleThemeAction {
    type: ActionTypes.toggleTheme;
    // payload: Theme
}

export const toggleTheme = () => ({
    type: ActionTypes.toggleTheme,
    // payload: {},
});
