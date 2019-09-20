import {Button as PButton} from "react-native-paper";
import {useNavigation} from "react-navigation-hooks";
import {Linking} from "expo";
import React from "react";

export const ButtonLink = (
    {
        to,
        params = {},
        onPress,
        ...props
    }: React.ComponentProps<typeof PButton> & {
        to: string,
        params?: any,
    }
) => {
    const {navigate} = useNavigation();

    return (
        <PButton
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
