/**
 * Button has been extended to support nav linking and default styles
 */
import React from "react";
import {Button as PButton} from "react-native-paper";
import {Dimensions} from "react-native";
import {Link} from "./Link";

export const Button = (
    {
        to,
        params = {},
        style = {},
        onPress,
        ...props
    }: React.ComponentProps<typeof PButton> & {
        to?: string,
        params?: any,
    }
) => {
    const buttonJsx = <PButton
        style={{
            marginBottom: 10,
            ...Dimensions.get('window').width > 720 && {maxWidth: 300},
            ...style,
        }}
        {...props}
    />

    if (to) return (
        <Link to={to} params={params} onPress={onPress}>
            {buttonJsx}
        </Link>
    );
    else return buttonJsx;
};
