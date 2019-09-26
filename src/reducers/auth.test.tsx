import {authReducer as reducer} from "./auth";
import {ActionTypes} from "../actions";

describe('auth reducer', () => {
    it('should return the initial state', () => {
        // @ts-ignore empty action
        expect(reducer(undefined, {})).toEqual({userId: "", token: "", roles: []})
    });

    it('should handle setAuth', () => {
        const payload = {userId: "12345", token: "1234567890", roles: ["admin", "identified"]};
        expect(reducer(
            undefined,
            {
                type: ActionTypes.setAuth,
                payload
            }
            )).toEqual(payload)
    });
});
