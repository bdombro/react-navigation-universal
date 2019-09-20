import {IconButton as PIconButton} from "react-native-paper";
import React from "react";
import {Link} from "./Link";

export const IconButtonLink = (
    {
        to,
        params = {},
        onPress,
        ...props
    }: React.ComponentProps<typeof PIconButton> & {
        to: string,
        params?: any,
    }
) => {
    return (
        <Link to={to} params={params} onPress={onPress}>
            <PIconButton {...props} />
        </Link>
    );
};
