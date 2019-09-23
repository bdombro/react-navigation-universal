/**
 * Text has been extended to support nav linking
 */
import React from "react";
import {flatten, mergeAll} from "ramda";
import {Text as PText} from "react-native-paper";
import {useNavigation} from "react-navigation-hooks";
import {Linking} from "expo";
import {TextStyle} from "react-native";
import {GlobalState} from "../../../GlobalState";

export type TextProps = React.ComponentProps<typeof PText> & {
    to?: string,
    params?: any,
};

export function Text ({to, params = {}, onPress, style = {}, ...props}: TextProps): React.ReactElement {
    const {navigate} = useNavigation();

    const textStyleBase: TextStyle = {
        ...(to || onPress) && {
            color: props.theme && props.theme.colors.link || GlobalState.theme.colors.link,
            textDecorationLine: "underline",
            textDecorationColor: props.theme && props.theme.colors.link || GlobalState.theme.colors.link,
        }
    };
    const textStyle = mergeAll(flatten([textStyleBase, style]));

    return (
        <PText
            onPress={async e => {
                if (onPress) await onPress(e);
                if (to) {
                    if (to === '#') void 0;
                    else if (to.startsWith("http")) Linking.openURL(to);
                    else navigate(to as string, params);
                }
            }}
            style={textStyle}
            {...props}
        />
    );
};
