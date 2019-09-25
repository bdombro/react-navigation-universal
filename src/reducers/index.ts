import { combineReducers } from 'redux';
import {ThemeConfig} from "../config/Theme.config";
import {getViewportInfoResponse} from "../lib/getViewportInfo";
import { authReducer } from './auth';
import {themeReducer} from "./theme";
import {viewportInfoReducer} from "./viewport-info";

export interface Auth {userId: string, token: string, roles: string[]}
export type Theme = typeof ThemeConfig.light;
export type ViewportInfo = getViewportInfoResponse;

export interface StoreState {
  auth: Auth;
  theme: Theme;
  viewportInfo: ViewportInfo;
}

export const reducers = combineReducers<StoreState>({
  auth: authReducer,
  theme: themeReducer,
  viewportInfo: viewportInfoReducer,
});
