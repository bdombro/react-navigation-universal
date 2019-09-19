import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import {Appbar, IconButtonLink, Text, Title, useTheme} from '../elements';
import {HeaderProps} from "react-navigation-stack";
import {GlobalState} from "../../GlobalState";
import {HeaderDefaultSection} from "./HeaderDefault.section";
import {NavigationStackProp} from "react-navigation-stack/src/types";
// import Animated, {Easing} from "react-native-reanimated";
import {Animated, Easing, View} from "react-native";



export const HeaderHomeSection = observer(function HeaderHomeSection(
    {
        headerProps,
        screenNavigation,
    }: {
        headerProps: HeaderProps,
        screenNavigation: NavigationStackProp,
    }
) {
    const theme = useTheme();

    if (GlobalState.viewportInfo.isLarge)
        return <HeaderDefaultSection headerProps={headerProps} screenNavigation={screenNavigation}/>;

    const [translateY] = useState(new Animated.Value(0));
    React.useEffect(() => {
        Animated.spring(
            translateY,
            {
                useNativeDriver: true,
                // duration: 500,
                toValue: Math.max(
                    // When scrolling down. Max with zero b/c scrollOffset can be negative when dragging
                    -Math.max(screenNavigation.getParam("scrollOffset", 0), 0),
                    // When scrolling back up, scroll the header back into view
                    -80 + Math.min(screenNavigation.getParam("scrollUpOffset", 0), 80)
                ),
            }
        ).start();
    }, [screenNavigation.state.params && screenNavigation.state.params.scrollOffset]);

    return (
        <Animated.View
            style={{
                height: 0,
                opacity: translateY.interpolate({
                    inputRange: [-30, 0],
                    outputRange: [0, 1]
                }),
                transform: [{translateY,}],
            }}
        >
            <Appbar.Header
                theme={{colors: {primary: "#ddd"}}}
            >
                <Title>
                    RNav Universal
                </Title>
                <Appbar.Content title=""/>
                <IconButtonLink icon="magnify" to="Blank" size={22} color="black"/>
            </Appbar.Header>
        </Animated.View>
    );
});
