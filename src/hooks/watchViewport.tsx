import * as React from "react";
import {useDispatch} from "react-redux";
import {Dimensions} from "react-native";
import {setViewportInfo} from "../actions";
import {getViewportInfo} from "../lib/getViewportInfo";

let widthCurrent = Dimensions.get("window").width;
export function watchViewport () {
    const dispatch = useDispatch();

   React.useEffect(() => {
        const interval = setInterval(() => {
            const widthNext = Dimensions.get("window").width;
            if (widthNext !== widthCurrent) {
                widthCurrent = widthNext;
                dispatch(setViewportInfo(getViewportInfo()));
            }
        }, 200);
        return () => clearInterval(interval);
    }, [false]);
}
