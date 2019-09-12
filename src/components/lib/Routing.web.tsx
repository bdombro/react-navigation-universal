import React from "react";

export {createBrowserApp as createAppContainer} from '@react-navigation/web';
import {Link as RNLink} from "@react-navigation/web";
import {Button, ButtonProps, Text, TextProps} from "react-native-elements";
import {useNavigation} from "react-navigation-hooks";
import {Linking} from "expo";

export {
    createNavigator,
    createSwitchNavigator,
    SceneView,
    StackRouter,
    SwitchRouter,
    withNavigation,
    withNavigationFocus,
} from "@react-navigation/core";
export {ScrollView} from "react-native";

export {createStackNavigator} from 'react-navigation-stack';
export {createDrawerNavigator} from 'react-navigation-drawer';
export {createBottomTabNavigator} from 'react-navigation-tabs';

export type LinkProps = {
    to: string,
    params?: any,
    onPress?: () => any,
    children: any,
}

export const Link = ({to, params = {}, onPress = () => null, ...props}: LinkProps) => {
    if (to === '#') {
        return <a href="javascript:void(0);" onClick={onPress} {...props} />;
    } else if (to.startsWith("http")) {
        return <a href={to} target="_blank" onClick={onPress} {...props} />;
    } else {
        return <RNLink routeName={to} params={params} {...props}/>;
    }
};

export const TextLink = ({to, params = {}, onPress, style = {}, ...props}: LinkProps & TextProps) => {
    style = {
        color: "#aaa",
        textDecorationLine: "underline",
        textDecorationColor: "#aaa",
        // @ts-ignore: spread on unknown
        ...style
    };
    return <Link to={to} params={params} onPress={onPress}><Text style={style} {...props}/></Link>
};

export const ButtonLink = ({to, params = {}, onPress, ...props}: Omit<LinkProps, 'children'> & ButtonProps) => {

    return (
        <Link to={to} params={params} onPress={onPress}>
            <Button {...props}/>
        </Link>
    );

};
