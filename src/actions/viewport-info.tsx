import {ActionTypes} from "./actionTypes";
import {ViewportInfo} from "../reducers";
import {getViewportInfoResponse} from "../lib/getViewportInfo";

export interface SetViewportInfoAction {
    type: ActionTypes.setViewportInfo;
    payload: ViewportInfo;
}

export const setViewportInfo = (viewportInfo: getViewportInfoResponse) => ({
    type: ActionTypes.setViewportInfo,
    payload: viewportInfo,
});
