/**
 * IconButton has been extended to support nav linking
 */
import * as React from "react";
import {IconButton as PIconButton} from "react-native-paper";
import {Link} from "../";

export type IconButtonProps = RequireAtLeastOne<React.ComponentProps<typeof PIconButton> & {
    to?: string,
    params?: any,
}, 'to' | 'onPress'>;

export function IconButton ({to, params = {}, onPress, ...props}: IconButtonProps): React.ReactElement {
    if (to) return (
        <Link to={to} params={params} onPress={onPress}>
            <PIconButton testID="IconButton" {...props} />
        </Link>
    );
    else return <PIconButton testID="IconButton" onPress={onPress} {...props} />;
};
