/**
 * Text has been extended to support nav linking
 */
import * as React from "react";
import {Text as PText} from "react-native-paper";
import {Link} from "../";
import {TextStyle} from "react-native";
import {flatten, mergeAll} from "ramda";
import {useSelector} from "react-redux";
import {StoreState} from "../../../reducers";
import {ThemeConfig} from "../../../config/Theme.config";

export type TextProps = Omit<React.ComponentProps<typeof PText>, 'theme'> & {
    to?: string,
    params?: any,
    theme?: typeof ThemeConfig.light
};

export function Text ({to, params = {}, onPress, style = {}, ...props}: TextProps): React.ReactElement {
    const theme = useSelector((state: StoreState) => state.theme);

    const textStyleBase: TextStyle = {
        ...(to || onPress) && {
            color: props.theme && props.theme.colors.link || theme.colors.link,
            textDecorationLine: "underline",
            textDecorationColor: props.theme && props.theme.colors.link || theme.colors.link,
        }
    };
    const textStyle = mergeAll(flatten([textStyleBase, style]));

    if (to) return (
        <Link
            to={to}
            params={params}
            onPress={onPress}
        >
            <PText
                testID="Text"
                style={textStyle}
                {...props}
            />
        </Link>
    );
    else if(onPress) return (
        <PText
            testID="Text"
            onPress={onPress}
            style={textStyle}
            {...props}
        />
    );
    else return <PText style={textStyle} {...props} />;
};
