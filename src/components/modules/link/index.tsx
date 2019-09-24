/**
 * Link allows us to easily make elements clickable and nav link
 */
import React from "react";
import {TouchableRipple} from "react-native-paper";
// import {useNavigation} from "react-navigation-hooks";
import {Linking} from "expo";

export type LinkProps = {
    to: string,
    params?: any,
    onPress?: (event: any) => any,
    children: any,
};

export function Link ({to, params = {}, onPress, children}: LinkProps): React.ReactElement {
    // const {navigate} = useNavigation();
    return (
        <TouchableRipple
            onPress={async e => {
                if (onPress) await onPress(e);
                if (to === '#') void 0;
                else if (to.startsWith("http")) Linking.openURL(to);
                // else navigate(to as string, params);
            }}
        >
            {children}
        </TouchableRipple>
    );
};
