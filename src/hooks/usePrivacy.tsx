import {useNavigation} from "react-navigation-hooks";
import {useLayoutEffect} from "react";
import {arrayIntersection} from "../lib/arrayIntersection";
import {useSelector} from 'react-redux';
import {StoreState} from "../reducers";

export let usePrivacyRedirectFrom;
export function usePrivacy (roleWhitelist: string[]) {
    const {navigate, state} = useNavigation();
    const roles = useSelector((state: StoreState) => state.auth.roles);

    useLayoutEffect(() => {
        if (!arrayIntersection(roleWhitelist, roles).length) {
            usePrivacyRedirectFrom = state;
            navigate("LoginScreen");
        }
    }, [roles]);
}
