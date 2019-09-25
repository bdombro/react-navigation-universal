import { Action, ActionTypes } from '../actions';
import { Theme } from './';
import {ThemeConfig} from "../config/Theme.config";
export const themeReducer = (state: Theme = ThemeConfig.light, action: Action) => {
  switch (action.type) {
    case ActionTypes.toggleTheme:
      return state.dark ? ThemeConfig.light : ThemeConfig.dark;
    default:
      return state;
  }
};
