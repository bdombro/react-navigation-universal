/**
 * Button has been extended to support nav linking and default styles
 */
import * as React from "react";
import {flatten, mergeAll} from "ramda";
import {Button as PButton} from "react-native-paper";
import {useNavigation} from "react-navigation-hooks";
import {Linking} from "expo";
import {ViewStyle} from "react-native";
import {useSelector} from "react-redux";
import {StoreState} from "../../../reducers";

export type ButtonProps = RequireAtLeastOne<React.ComponentProps<typeof PButton> & {
    to?: string,
    params?: any,
}, 'to' | 'onPress'>;

export function Button ({to, params = {}, style = {}, onPress, ...props}: ButtonProps): React.ReactElement {
    const {navigate} = useNavigation();
    const viewportInfo = useSelector((state: StoreState) => state.viewportInfo);

    const buttonStyleBase: ViewStyle = {
        marginBottom: 10,
        ...viewportInfo.isLarge && {maxWidth: 300},
    };
    const buttonStyle = mergeAll(flatten([buttonStyleBase, style]));

    return (
        <PButton
            testID="Button"
            style={buttonStyle}
            onPress={async e => {
                if (onPress) await onPress(e);
                if (to) {
                    if (to === '#') void 0;
                    else if (to.startsWith("http")) Linking.openURL(to);
                    else navigate(to, params);
                }
            }}
            {...props}
        />
    );
};
