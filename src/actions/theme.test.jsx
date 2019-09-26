import {toggleTheme} from "./theme";

describe('actions', () => {
    it('should create an action to toggle the theme', () => {
        expect(toggleTheme()).toMatchSnapshot();
    });
});
