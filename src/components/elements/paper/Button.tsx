/**
 * Button has been extended to support nav linking and default styles
 */
import React from "react";
import {Button as PButton} from "react-native-paper";
import {useNavigation} from "react-navigation-hooks";
import {Linking} from "expo";
import {Dimensions} from "react-native";

export const Button = (
    {
        to,
        params = {},
        style = {},
        onPress,
        ...props
    }: React.ComponentProps<typeof PButton> & {
        to?: string,
        params?: any,
    }
) => {
    const {navigate} = useNavigation();

    return (
        <PButton
            style={{
                marginBottom: 10,
                ...Dimensions.get('window').width > 720 && {maxWidth: 300},
                ...style,
            }}
            onPress={async e => {
                if (onPress) await onPress(e);
                if (to) {
                    if (to === '#') void 0;
                    else if (to.startsWith("http")) Linking.openURL(to);
                    else navigate(to, params);
                }
            }}
            {...props}
        />
    );
};
