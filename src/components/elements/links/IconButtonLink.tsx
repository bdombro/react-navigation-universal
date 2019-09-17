import {IconButton, IconButtonProps} from "react-native-paper";
import {useNavigation} from "react-navigation-hooks";
import {Linking} from "expo";
import React from "react";

export const IconButtonLink = (
    {
        to,
        params = {},
        onPress,
        ...props
    }: IconButtonProps & {
        to: string,
        params?: any,
        onPress?: (event: any) => any,
    }
) => {
    const {navigate} = useNavigation();

    return (
        <IconButton
            onPress={async e => {
                if (onPress) await onPress(e);
                if (to === '#') void 0;
                else if (to.startsWith("http")) Linking.openURL(to);
                else navigate(to as string, params);
            }}
            {...props}
        />
    );
};
