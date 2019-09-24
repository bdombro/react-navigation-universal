// import {useNavigation} from "react-navigation-hooks";
import {useLayoutEffect} from "react";
// import {GlobalStore} from "../state/global-store";
import {arrayIntersection} from "../lib/arrayIntersection";

export let usePrivacyRedirectFrom;
export function usePrivacy (roleWhitelist: string[]) {
    // const {navigate, state} = useNavigation();

    useLayoutEffect(() => {
        // const roles = GlobalStore.user.roles.length ? GlobalStore.user.roles.split(',') : [];
        // if (!arrayIntersection(roleWhitelist, roles).length) {
        //     usePrivacyRedirectFrom = state;
        //     navigate("LoginScreen");
        // }
    }, []);
}
