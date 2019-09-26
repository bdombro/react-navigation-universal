import {viewportInfoReducer as reducer} from "./viewport-info";
import {ActionTypes} from "../actions";

describe('viewport-info reducer', () => {
    it('should return the initial state', () => {
        const initialState = {
            "height": 1314,
            "heightBody": 1267,
            "heightBottomSpeaker": 0,
            "heightFooter": 0,
            "heightHeader": 67,
            "heightStatusBar": 20,
            "heightUnsafe": 1334,
            "isLarge": true,
            "isLargeNative": true,
            "isLargeWeb": false,
            "isSmall": false,
            "isSmallNative": false,
            "isSmallWeb": false,
            "width": 750,
        };
        // @ts-ignore empty action
        expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should handle setViewportInfo', () => {
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
        expect(reducer(
            undefined,
            {
                type: ActionTypes.setViewportInfo,
                payload
            }
            )).toEqual(payload)
    });
});
