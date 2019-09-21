/**
 * Text has been extended to support nav linking
 */
import React from "react";
import {Text as PText} from "react-native-paper";
import {useNavigation} from "react-navigation-hooks";
import {Linking} from "expo";

export const Text = (
    {
        to,
        params = {},
        onPress,
        style = {},
        ...props
    }: React.ComponentProps<typeof PText> & {
        to?: string,
        params?: any,
        onPress?: (event: any) => any,
    }
) => {
    const {navigate} = useNavigation();

    return (
        <PText
            onPress={async e => {
                if (onPress) await onPress(e);
                if (to) {
                    if (to === '#') void 0;
                    else if (to.startsWith("http")) Linking.openURL(to);
                    else navigate(to as string, params);
                }
            }}
            style={{
                ...to && {
                    color: "#aaa",
                    textDecorationLine: "underline",
                    textDecorationColor: "#aaa",
                },
                ...style
            }}
            {...props}
        />
    );
};
