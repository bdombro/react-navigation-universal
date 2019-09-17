import {Text, TypographyProps} from "react-native-paper";
import {useNavigation} from "react-navigation-hooks";
import {Linking} from "expo";
import React from "react";

export const TextLink = (
    {
        to,
        params = {},
        onPress,
        style = {},
        ...props
    }: TypographyProps & {
        to: string,
        params?: any,
        onPress?: (event: any) => any,
        children: any,
    }
) => {
    const {navigate} = useNavigation();
    style = {
        color: "#aaa",
        textDecorationLine: "underline",
        textDecorationColor: "#aaa",
        // @ts-ignore: spread on unknown
        ...style
    };

    return (
        <Text
            onPress={async e => {
                if (onPress) await onPress(e);
                if (to === '#') void 0;
                else if (to.startsWith("http")) Linking.openURL(to);
                else navigate(to as string, params);
            }}
            style={style} {...props}
        />
    );
};
