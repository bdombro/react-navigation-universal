/**
 * Button has been extended to support nav linking and default styles
 */
import * as React from "react";
import {Button as PButton} from "react-native-paper";
import {ViewStyle} from "react-native";
import {mergeAll, flatten} from "ramda";
import {Link} from "../";
import {useSelector} from "react-redux";
import {StoreState} from "../../../reducers";

export type ButtonProps = RequireAtLeastOne<React.ComponentProps<typeof PButton> & {
    to?: string,
    params?: any,
}, 'to' | 'onPress'>;

export function Button ({to, params = {}, style = {}, onPress, ...props}: ButtonProps): React.ReactElement {
    const viewportInfo = useSelector((state: StoreState) => state.viewportInfo);

    const buttonStyleBase: ViewStyle = {
        marginBottom: 10,
        ...viewportInfo.isLarge && {maxWidth: 300},
    };
    const buttonStyle = mergeAll(flatten([buttonStyleBase, style]));

    if (to) return (
        <Link to={to} params={params} onPress={onPress}>
            <PButton
                testID="Button"
                style={buttonStyle}
                {...props}
            />
        </Link>
    );
    else return (
        <PButton
            testID="Button"
            onPress={onPress}
            style={buttonStyle}
            {...props}
        />
    );
};
