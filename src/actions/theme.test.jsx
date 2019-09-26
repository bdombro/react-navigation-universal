import {toggleTheme} from "./theme";
import {ActionTypes} from "./actionTypes";

describe('theme actions', () => {
    it('should create an action to toggle the theme', () => {
        expect(toggleTheme()).toEqual({type: ActionTypes.toggleTheme});
    });
});
