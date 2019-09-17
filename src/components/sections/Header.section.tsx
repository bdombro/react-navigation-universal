import React from "react";
import {useNavigation} from "react-navigation-hooks";
import {observer} from "mobx-react-lite";
import {MaterialIcons} from '@expo/vector-icons';
import {Platform, View} from "react-native";
import {GlobalState} from "../../GlobalState";
import {Appbar, Avatar, IconButtonLink, Link, useTheme} from '../elements';
import {IconButton} from "react-native-paper";

export const HeaderSection = observer(() => {
    const {goBack, state} = useNavigation();
    const theme = useTheme();
    console.dir(theme);

    // Determine if the current route is within a stack and NOT the top of stack
    let isStackInnerPage;
    let currentRoute = state.routes[state.index];
    if (currentRoute.routeName === "Tabs")
        currentRoute = currentRoute.routes[currentRoute.index];
    if (currentRoute.routes)
        isStackInnerPage = currentRoute.index > 0;

    let titleOpacity = 0;
    let backgroundLightness =  GlobalState.viewportInfo.isLarge ? 87.5 : 100;
    if (GlobalState.currentPageScrollOffset !== null) {
        if (GlobalState.currentPageScrollOffset <= 120) {
            titleOpacity = GlobalState.currentPageScrollOffset / 120;
            backgroundLightness = GlobalState.viewportInfo.isLarge ? 87.5 : 100*(1-titleOpacity/8);
        } else {
            titleOpacity = 1;
            backgroundLightness = 87.5;
        }
    }

    return (
        <Appbar.Header theme={{colors: {primary: `hsl(0,0%,${backgroundLightness}%)`}}} >
            {isStackInnerPage && <Appbar.BackAction onPress={() => goBack()}/>}
            <Appbar.Content style={{opacity: titleOpacity}} title={GlobalState.currentPageTitle}/>


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
