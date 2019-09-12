import React from 'react';
import {Linking} from 'expo';
import {TouchableOpacity} from "react-native";
import {Button, ButtonProps, Text, TextProps} from "react-native-elements";
import {useNavigation} from "react-navigation-hooks";

export {
    createNavigator,
    createSwitchNavigator,
    SceneView,
    StackRouter,
    SwitchRouter,
    withNavigation,
    withNavigationFocus,
} from "@react-navigation/core";
export {createAppContainer} from "@react-navigation/native";
// export {ScrollView} from "react-navigation"; // throwing errors, doesn't seem to work anyways.
export {ScrollView} from "react-native";

export {createStackNavigator} from 'react-navigation-stack';
export {createDrawerNavigator} from 'react-navigation-drawer';
export {createBottomTabNavigator} from 'react-navigation-tabs';

export type LinkProps = {
    to: string,
    params?: any,
    onPress?: (event: any) => any,
    children: any,
}

export const Link = ({to, params = {}, onPress, children}: LinkProps) => {
    const {navigate} = useNavigation();
    return (
        <TouchableOpacity
            onPress={async e => {
                if (onPress) await onPress(e);
                if (to === '#') void 0;
                else if (to.startsWith("http")) Linking.openURL(to);
                else navigate(to as string, params);
            }}
        >
            {children}
        </TouchableOpacity>
    );
};

export const TextLink = ({to, params = {}, onPress, style = {}, ...props}: LinkProps & TextProps) => {
    const {navigate} = useNavigation();
    style = {
        color: "#aaa",
        textDecorationLine: "underline",
        textDecorationColor: "#aaa",
        // @ts-ignore: spread on unknown
        ...style
    };

    return (
        <Text
            onPress={async e => {
                if (onPress) await onPress(e);
                if (to === '#') void 0;
                else if (to.startsWith("http")) Linking.openURL(to);
                else navigate(to as string, params);
            }}
            style={style} {...props}
        />
    );

};

export const ButtonLink = ({to, params = {}, onPress, ...props}: Omit<LinkProps, 'children'> & ButtonProps) => {
    const {navigate} = useNavigation();

    return (
        <Button
            onPress={async e => {
                if (onPress) await onPress(e);
                if (to === '#') void 0;
                else if (to.startsWith("http")) Linking.openURL(to);
                else navigate(to as string, params);
            }}
            {...props}
        />
    );

};
