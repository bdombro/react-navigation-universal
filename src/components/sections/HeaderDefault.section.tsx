import React from "react";
import {observer} from "mobx-react-lite";
import {MaterialIcons} from '@expo/vector-icons';
import {Platform, View} from "react-native";
import {GlobalState} from "../../GlobalState";
import {Appbar, Avatar, IconButtonLink, Link, useTheme} from '../elements';
import {HeaderProps} from "react-navigation-stack";
import {NavigationStackProp} from "react-navigation-stack/src/types";

export const HeaderDefaultSection = observer(function HeaderDefaultSection(
    {
        headerProps,
        screenNavigation,
    } : {
        headerProps: HeaderProps,
        screenNavigation: NavigationStackProp,
    }
) {
    const theme = useTheme();

    // Determine if the current route is within a stack and NOT the top of stack
    // let isStackInnerPage;
    // let currentRoute = screenNavigation.state.routes[screenNavigation.state.index];
    // if (currentRoute.routeName === "Tabs")
    //     currentRoute = currentRoute.routes[currentRoute.index];
    // if (currentRoute.routes)
    //     isStackInnerPage = currentRoute.index > 0;

    return (
        <Appbar.Header
            theme={{colors: {primary: "#ddd"}}}
            style={{
            }}
        >
            {!screenNavigation.isFirstRouteInParent() && <Appbar.BackAction onPress={() => screenNavigation.goBack()}/>}
            <Appbar.Content title={
                GlobalState.viewportInfo.isSmall
                && GlobalState.currentPage.title
            }/>


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
