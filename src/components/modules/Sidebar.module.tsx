import React from "react";
import {View} from "react-native";
import {observer} from "mobx-react-lite";
import {ThemeConfig} from "../../config/Theme.config";
import {Text, Link} from "../elements/paper";

export const SidebarModule = observer(function SidebarModule () {
    const sidebarTheme = ThemeConfig.dark;
    return (
        <View>
            <Text theme={sidebarTheme}>Desktop Sidebar</Text>
            <Link to="HomeStack"><Text theme={sidebarTheme}>Home</Text></Link>
            <Link to="Home2Stack"><Text theme={sidebarTheme}>Home2</Text></Link>
            <Link to="Blank"><Text theme={sidebarTheme}>Blank</Text></Link>
        </View>
    );
});
