import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {Dimensions} from "react-native";
import {setViewportInfo} from "../actions";
import {getViewportInfo} from "../lib/getViewportInfo";

let widthCurrent = Dimensions.get("window").width;
export function watchViewport () {
    const dispatch = useDispatch();

    useEffect(() => {
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
