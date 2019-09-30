/**
 * Text has been extended to support nav linking
 */
import * as React from "react";
import {flatten, mergeAll} from "ramda";
import {Text as PText} from "react-native-paper";
import {useNavigation} from "react-navigation-hooks";
import {Linking} from "expo";
import {TextStyle} from "react-native";
import {useSelector} from "react-redux";
import {StoreState} from "../../../reducers";
import {ThemeConfig} from "../../../config/Theme.config";

export type TextProps = React.ComponentProps<typeof PText> & {
    to?: string,
    params?: any,
    theme?: typeof ThemeConfig.light
};

export function Text ({to, params = {}, onPress, style = {}, ...props}: TextProps): React.ReactElement {
    const {navigate} = useNavigation();
    const theme = useSelector((state: StoreState) => state.theme);

    const textStyleBase: TextStyle = {
        ...(to || onPress) && {
            color: props.theme && props.theme.colors.link || theme.colors.link,
            textDecorationLine: "underline",
            textDecorationColor: props.theme && props.theme.colors.link || theme.colors.link,
        }
    };
    const textStyle = mergeAll(flatten([textStyleBase, style]));

    return (
        <PText
            testID="Text"
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
