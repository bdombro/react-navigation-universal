import {Text, TypographyProps} from "react-native-paper";
import React from "react";
import {Link} from "./Link";

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
        onPress?: () => any,
        children: any,
    }
) => {
    style = {
        color: "#aaa",
        textDecorationLine: "underline",
        textDecorationColor: "#aaa",
        // @ts-ignore: spread on unknown
        ...style
    };
    return <Link to={to} params={params} onPress={onPress}><Text style={style} {...props}/></Link>
};
