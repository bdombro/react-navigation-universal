/**
 * IconButton has been extended to support nav linking
 */
import React from "react";
import {Linking} from "expo";
import {IconButton as PIconButton} from "react-native-paper";
import {useNavigation} from "react-navigation-hooks";

export const IconButton = (
    {
        to,
        params = {},
        onPress,
        ...props
    }: React.ComponentProps<typeof PIconButton> & {
        to?: string,
        params?: any,
    }
) => {
    const {navigate} = useNavigation();

    return (
        <PIconButton
            onPress={async e => {
                if (onPress) await onPress(e);
                if (to) {
                    if (to === '#') void 0;
                    else if (to.startsWith("http")) Linking.openURL(to);
                    else navigate(to as string, params);
                }
            }}
            {...props}
        />
    );
};
