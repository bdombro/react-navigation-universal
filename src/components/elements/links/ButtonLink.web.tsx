import {Button, ButtonProps} from "react-native-paper";
import React from "react";
import {Link} from "./Link";

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
        onPress?: () => any,
        children: any,
    }
) => {
    return (
        <Link to={to} params={params} onPress={onPress}>
            <Button {...props}>{children}</Button>
        </Link>
    );
};
