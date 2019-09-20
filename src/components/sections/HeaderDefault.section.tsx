import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import {MaterialIcons} from '@expo/vector-icons';
import {Animated, Platform, View} from "react-native";
import {GlobalState} from "../../GlobalState";
import {Appbar, Avatar, IconButtonLink, Link, useTheme} from '../elements/paper';
import {NavigationStackProp} from "react-navigation-stack/src/types";
import {ThemeConfig} from "../../config/Theme.config";

export const HeaderDefaultSection = observer(function HeaderDefaultSection(
    {
        navigation,
        title,
        scrollOffset,
        scrollUpOffset,
    }: {
        navigation: NavigationStackProp,
        title: string,
        scrollOffset: number,
        scrollUpOffset: number,
    }
) {
    const theme = useTheme() as typeof ThemeConfig;

    const [titleOpacity] = useState(new Animated.Value(0));
    React.useEffect(() => {
        if (GlobalState.viewportInfo.isSmall) titleOpacity.setValue(1);
        else titleOpacity.setValue(
            Math.min(Math.max(scrollOffset/80 - .5, 0), 1)
        );
    }, [scrollOffset]);

    return (
        <Appbar.Header
            style={{
                backgroundColor: theme.colors.primaryLightest,
                elevation: 0,
                ...GlobalState.viewportInfo.isLarge && {height: 46}
            }}
        >
            {!navigation.isFirstRouteInParent() && <Appbar.BackAction onPress={() => navigation.goBack()}/>}
            <Appbar.Content
                title={
                    <Animated.Text style={{
                        opacity: titleOpacity
                    }}>{title}</Animated.Text>
                }
            />


            {GlobalState.viewportInfo.isLarge && <>
                <IconButtonLink icon="magnify" to="Blank" size={22} color="#999"/>
                <View>
                    <IconButtonLink icon="bell-outline" to="Blank" size={22} color="#999"/>
                    {/*{!notificationQuery.loading && !!notificationQuery.data.length && (*/}
                    <MaterialIcons
                        name="broken-image"
                        size={10}
                        color="red"
                        style={{
                            width: 10,
                            height: 10,
                            position: 'relative',
                            top: -34,
                            left: 25,
                            marginBottom: -10
                        }}
                    />
                </View>
                <Link to="Blank">
                    <Avatar.Text
                        size={32}
                        label="BD"
                        style={{marginLeft: 10}}
                    />
                </Link>
                <Appbar.Action
                    // icon={{source: () => <MaterialIcons name="more-vert" size={22} color="#999"/>}}
                    icon={Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'}
                    onPress={() => console.log("More")}
                    style={{marginLeft: -5}}
                    color="#999"/>
            </>}


        </Appbar.Header>
    );
});
