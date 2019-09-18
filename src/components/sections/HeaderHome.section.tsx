import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import {View} from "react-native";
import {Appbar, IconButtonLink, Text, Title, useTheme} from '../elements';
import {HeaderProps} from "react-navigation-stack";
import {GlobalState} from "../../GlobalState";
import {HeaderDefaultSection} from "./HeaderDefault.section";
import {NavigationStackProp} from "react-navigation-stack/src/types";

export const HeaderHomeSection = observer(function HeaderHomeSection(
    {
        headerProps,
        screenNavigation,
    } : {
        headerProps: HeaderProps,
        screenNavigation: NavigationStackProp,
    }
) {
    const theme = useTheme();

    const scrollOffset = screenNavigation.getParam("scrollOffset", 0);
    const scrollUpOffset = screenNavigation.getParam("scrollUpOffset", 0);
    console.dir(scrollUpOffset);

    // if (GlobalState.viewportInfo.isLarge) return <HeaderDefaultSection {...props} />;

    return (
        <Appbar.Header
            theme={{colors: {primary: "#ddd"}}}
            style={{
                marginTop: Math.max(-scrollOffset, -56+Math.min(scrollUpOffset,56)),
                // overflow: "hidden",
            }}
        >
            <Title>
                RNav Universal
            </Title>
            <Appbar.Content title=""/>
            <IconButtonLink icon="magnify" to="Blank" size={22} color="black"/>
        </Appbar.Header>
    );
});
