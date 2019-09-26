import {setAuth, resetAuth} from "./auth";
import {ActionTypes} from './ActionTypes'

describe('auth actions', () => {
    it('should create an action to set auth', () => {
        const payload = {userId: "12345", token: "1234567890", roles: ["admin", "identified"]};
        const expectedAction = {
            type: ActionTypes.setAuth,
            payload
        };
        expect(setAuth(payload)).toEqual(expectedAction);
        // expect(setAuth(payload)).toMatchSnapshot();
    });

    it('should create an action to reset auth', () => {
        const payload = {userId: "", token: "", roles: []};
        const expectedAction = {
            type: ActionTypes.resetAuth,
            payload
        };
        expect(resetAuth()).toEqual(expectedAction);
        // expect(resetAuth(payload)).toMatchSnapshot();
    });
});
