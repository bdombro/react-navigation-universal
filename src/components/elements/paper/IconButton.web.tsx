/**
 * IconButton has been extended to support nav linking
 */
import React from "react";
import {IconButton as PIconButton} from "react-native-paper";
import {Link} from "./Link";

export const IconButton = (
    {
        to,
        params = {},
        onPress,
        ...props
    }: React.ComponentProps<typeof PIconButton> & {
        to?: string,
        params?: any,
    }
) => {
    const buttonJsx = <PIconButton {...props} />;

    if (to) return (
        <Link to={to} params={params} onPress={onPress}>
            {buttonJsx}
        </Link>
    );
    else return buttonJsx;
};
