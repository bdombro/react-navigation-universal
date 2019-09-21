import React from "react";
import {View} from "react-native";
import {observer} from "mobx-react-lite";
import {ThemeConfig} from "../../config/Theme.config";
import {Text, Link} from "../elements";
import {useNavigation} from "react-navigation-hooks";
import {getBreadcrumbsOfActiveRoute} from "../../lib/NavigationHelpers";
import {GlobalState} from "../../GlobalState";

export const SidebarModule = observer(function SidebarModule () {
    const sidebarTheme = ThemeConfig.dark;
    const breadcrumbs = getBreadcrumbsOfActiveRoute(useNavigation().state);

    function SidebarItem ({routeName, params = {}, label}: {routeName: string, params?: any, label: string}) {
        return (
            <Link to={routeName} params={params}>
                <Text theme={sidebarTheme} style={{
                    ...breadcrumbs.includes(routeName) && {color: "blue"}
                }}>
                    {label}
                </Text>
            </Link>
        );
    }

    return (
        <View>
            <Text theme={sidebarTheme}>Desktop Sidebar</Text>
            <SidebarItem routeName="HomeStack" label="Home" />
            <SidebarItem routeName="Home2Stack" label="Home2" />
            <SidebarItem routeName="BlankScreen" label="Blank" />

            <Text onPress={GlobalState.toggleTheme} theme={sidebarTheme}>Toggle Theme</Text>

        </View>
    );
});
