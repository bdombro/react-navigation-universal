/**
 * IconButton has been extended to support nav linking
 */
import React from "react";
import {IconButton as PIconButton} from "react-native-paper";
import {Link} from "../";

export type IconButtonProps = RequireAtLeastOne<React.ComponentProps<typeof PIconButton> & {
    to?: string,
    params?: any,
}, 'to' | 'onPress'>;

export function IconButton ({to, params = {}, onPress, ...props}: IconButtonProps): React.ReactElement {
    if (to) return (
        <Link to={to} params={params} onPress={onPress}>
            <PIconButton {...props} />
        </Link>
    );
    else return <PIconButton onPress={onPress} {...props} />;
};
