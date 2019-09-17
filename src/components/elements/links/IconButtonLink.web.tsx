import {IconButton, IconButtonProps} from "react-native-paper";
import React from "react";
import {Link} from "./Link";

export const IconButtonLink = (
    {
        to,
        params = {},
        onPress,
        ...props
    }: IconButtonProps & {
        to: string,
        params?: any,
        onPress?: () => any,
    }
) => {
    return (
        <Link to={to} params={params} onPress={onPress}>
            <IconButton {...props} />
        </Link>
    );
};
