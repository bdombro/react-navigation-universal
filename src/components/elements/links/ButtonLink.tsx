import {Button, ButtonProps} from "react-native-paper";
import {useNavigation} from "react-navigation-hooks";
import {Linking} from "expo";
import React from "react";

export const ButtonLink = (
    {
        to,
        params = {},
        onPress,
        children,
        ...props
    }: ButtonProps & {
        to: string,
        params?: any,
        onPress?: (event: any) => any,
        children: any,
    }
) => {
    const {navigate} = useNavigation();

    return (
        <Button
            onPress={async e => {
                if (onPress) await onPress(e);
                if (to === '#') void 0;
                else if (to.startsWith("http")) Linking.openURL(to);
                else navigate(to as string, params);
            }}
            {...props}
        >
            {children}
        </Button>
    );
};
