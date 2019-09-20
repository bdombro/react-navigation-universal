import {Button as PButton} from "react-native-paper";
import React from "react";
import {Link} from "./Link";

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
    return (
        <Link to={to} params={params} onPress={onPress}>
            <PButton {...props} />
        </Link>
    );
};
