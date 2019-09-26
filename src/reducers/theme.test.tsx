import {themeReducer as reducer} from "./theme";
import {ActionTypes} from "../actions";
import {ThemeConfig} from "../config/Theme.config";

describe('theme reducer', () => {
    it('should return the initial state', () => {
        // @ts-ignore empty action
        expect(reducer(undefined, {})).toEqual(ThemeConfig.light)
    });

    it('should handle toggleTheme', () => {
        expect(reducer(
            undefined,
            {type: ActionTypes.toggleTheme}
            )).toEqual(ThemeConfig.dark)
    });
});
