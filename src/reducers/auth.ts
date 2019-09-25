import { Action, ActionTypes } from '../actions';
import { Auth } from './';
export const authReducer = (state: Auth = {userId: "", token: "", roles: []}, action: Action) => {
  switch (action.type) {
    case ActionTypes.setAuth:
      return action.payload;
    case ActionTypes.resetAuth:
      return action.payload;
    default:
      return state;
  }
};
