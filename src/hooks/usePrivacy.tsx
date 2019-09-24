import {useNavigation} from "react-navigation-hooks";
import {useLayoutEffect} from "react";
import {autorun} from "mobx";
import {GlobalStore} from "../state/global-store";
import {arrayIntersection} from "../lib/arrayIntersection";

export let usePrivacyRedirectFrom;
export function usePrivacy (roleWhitelist: string[]) {
    const {navigate, state} = useNavigation();

    useLayoutEffect(() => {
        return autorun(() => {
            if (!arrayIntersection(roleWhitelist, GlobalStore.user.roles).length) {
                usePrivacyRedirectFrom = state;
                navigate("LoginScreen");
            }
        });
    }, []);
}
