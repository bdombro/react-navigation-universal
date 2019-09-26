import {setViewportInfo} from "./viewport-info";
import {ActionTypes} from './ActionTypes'

describe('viewport-info actions', () => {
    it('should create an action to set viewport', () => {
        const payload = {
            width: 0,
            heightUnsafe: 0,
            heightStatusBar: 0,
            heightBottomSpeaker: 0,
            heightHeader: 0,
            heightFooter: 0,
            height: 0,
            heightBody: 0,
            isSmall: true,
            isSmallWeb: true,
            isSmallNative: true,
            isLarge: true,
            isLargeWeb: true,
            isLargeNative: true,
        };
        const expectedAction = {
            type: ActionTypes.setViewportInfo,
            payload
        };
        expect(setViewportInfo(payload)).toEqual(expectedAction);
        // expect(setAuth(payload)).toMatchSnapshot();
    });
});
