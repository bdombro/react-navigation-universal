import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import {Appbar, IconButtonLink, Title, useTheme} from '../elements/paper';
import {NavigationStackProp} from "react-navigation-stack/src/types";
import {Animated} from "react-native";
import {GlobalState} from "../../GlobalState";
import {HeaderDefaultSection} from "./HeaderDefault.section";
import {ThemeConfig} from "../../config/Theme.config";

export const HeaderHomeSection = observer(function HeaderHomeSection(
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

    const [translateY] = useState(new Animated.Value(0));
    React.useEffect(() => {
        translateY.setValue(Math.max(
            // When scrolling down. Max with zero b/c scrollOffset can be negative when dragging
            -Math.max(scrollOffset, 0),
            // When scrolling back up, scroll the header back into view
            -80 + Math.min(scrollUpOffset, 80)
        ));
    }, [scrollOffset]);

    if (GlobalState.viewportInfo.isLarge)
        return <HeaderDefaultSection {...{navigation, title, scrollOffset, scrollUpOffset}}/>;

    return (
        <Animated.View
            style={{
                zIndex: 999,
                height: 0,
                opacity: translateY.interpolate({
                    inputRange: [-30, 0],
                    outputRange: [0, 1]
                }),
                transform: [{translateY,}],
            }}
        >
            <Appbar.Header
                style={{
                    backgroundColor: theme.colors.primaryLightest,
                    elevation: 0,
                    ...GlobalState.viewportInfo.isLarge && {height: 46}
                }}
            >
                <Title>{title}</Title>
                <Appbar.Content title=""/>
                <IconButtonLink icon="magnify" to="Blank" size={22} color="black"/>
            </Appbar.Header>
        </Animated.View>
    );
});
