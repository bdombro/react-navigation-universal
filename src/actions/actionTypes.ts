import { SetAuthAction, ResetAuthAction } from './auth';
import {ToggleThemeAction} from "./theme";
import {SetViewportInfoAction} from "./viewport-info";

export enum ActionTypes {
  setAuth,
  resetAuth,
  toggleTheme,
  setViewportInfo,
}

export type Action = SetAuthAction | ResetAuthAction | ToggleThemeAction | SetViewportInfoAction;
// this along with the enum
//sets up an implicit type guard in the reducer
