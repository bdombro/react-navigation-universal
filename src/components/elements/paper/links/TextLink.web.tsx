import {Text as PText} from "react-native-paper";
import React from "react";
import {Link} from "./Link";

export const TextLink = (
    {
        to,
        params = {},
        onPress,
        style = {},
        ...props
    }: React.ComponentProps<typeof PText> & {
        to: string,
        params?: any,
        onPress?: () => any,
    }
) => {
    return (
        <Link
            to={to}
            params={params}
            onPress={onPress}
        >
            <PText
                style={{
                    color: "#aaa",
                    textDecorationLine: "underline",
                    textDecorationColor: "#aaa",
                    // @ts-ignore: spread on unknown
                    ...style
                }}
                {...props}
            />
        </Link>
    )
};
