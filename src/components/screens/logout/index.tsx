import * as React from "react";
import {useNavigation} from "react-navigation-hooks";
import {useDispatch} from "react-redux";
import {resetAuth} from "../../../actions";

export function LogoutScreen (): React.ReactElement {
    const {navigate} = useNavigation();
    const dispatch = useDispatch();

    React.useLayoutEffect(() => {
        dispatch(resetAuth());
        navigate('HomeStack');
    });

    return <></>;
};
