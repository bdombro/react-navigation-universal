/**
 * Button has been extended to support nav linking and default styles
 */
import React from "react";
import {Button as PButton} from "react-native-paper";
import {ViewStyle} from "react-native";
import {mergeAll, flatten} from "ramda";
import {GlobalStore} from "../../../state/global-store";
import {Link} from "../";

export type ButtonProps = RequireAtLeastOne<React.ComponentProps<typeof PButton> & {
    to?: string,
    params?: any,
}, 'to' | 'onPress'>;

export function Button ({to, params = {}, style = {}, onPress, ...props}: ButtonProps): React.ReactElement {
    const buttonStyleBase: ViewStyle = {
        marginBottom: 10,
        ...GlobalStore.viewportInfo.isLarge && {maxWidth: 300},
    };
    const buttonStyle = mergeAll(flatten([buttonStyleBase, style]));

    if (to) return (
        <Link to={to} params={params} onPress={onPress}>
            <PButton
                style={buttonStyle}
                {...props}
            />
        </Link>
    );
    else return (
        <PButton
            onPress={onPress}
            style={buttonStyle}
            {...props}
        />
    );
};
