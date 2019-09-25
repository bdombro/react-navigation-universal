import { Action, ActionTypes } from '../actions';
import {ViewportInfo} from './';
import {getViewportInfo} from "../lib/getViewportInfo";
export const viewportInfoReducer = (state: ViewportInfo = getViewportInfo(), action: Action) => {
  switch (action.type) {
    case ActionTypes.setViewportInfo:
      return action.payload;
    default:
      return state;
  }
};
