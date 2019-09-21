/**
 * Text has been extended to support nav linking
 */
import React from "react";
import {Text as PText} from "react-native-paper";
import {Link} from "./Link";

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
        onPress?: () => any,
    }
) => {
    const textJsx = <PText
        style={{
            ...to && {
                color: "#aaa",
                textDecorationLine: "underline",
                textDecorationColor: "#aaa",
            },
            ...style
        }}
        {...props}
    />;

    if (to) return (
        <Link
            to={to}
            params={params}
            onPress={onPress}
        >
            {textJsx}
        </Link>
    )
    else return textJsx;
};
