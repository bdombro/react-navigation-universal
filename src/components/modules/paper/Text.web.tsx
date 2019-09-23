/**
 * Text has been extended to support nav linking
 */
import React from "react";
import {Text as PText} from "react-native-paper";
import {Link} from "../";
import {TextStyle} from "react-native";
import {flatten, mergeAll} from "ramda";
import {GlobalState} from "../../../GlobalState";

export type TextProps = React.ComponentProps<typeof PText> & {
    to?: string,
    params?: any,
};

export function Text ({to, params = {}, onPress, style = {}, ...props}: TextProps): React.ReactElement {
    const textStyleBase: TextStyle = {
        ...(to || onPress) && {
            color: props.theme && props.theme.colors.link || GlobalState.theme.colors.link,
            textDecorationLine: "underline",
            textDecorationColor: props.theme && props.theme.colors.link || GlobalState.theme.colors.link,
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
                style={textStyle}
                {...props}
            />
        </Link>
    );
    else if(onPress) return (
        <PText
            onPress={onPress}
            style={textStyle}
            {...props}
        />
    );
    else return <PText style={textStyle} {...props} />;
};
