import React, {useMemo} from "react";
import {View} from "react-native";
import {observer} from "mobx-react-lite";
import {useNavigation} from "react-navigation-hooks";
import {ThemeConfig} from "../../../config/Theme.config";
import {GlobalStore} from "../../../state/global-store";
import {getBreadcrumbsOfActiveRoute} from "../../../lib/getBreadcrumbsOfActiveRoute";
import {Text} from "../";

export const SidebarDefault = observer(function SidebarDefault() {
    const sidebarTheme = ThemeConfig.dark;
    const navigation = useNavigation();
    const breadcrumbs = useMemo(() => getBreadcrumbsOfActiveRoute(navigation.state), [navigation.state]);

    function SidebarItem({routeName, params = {}, label}: { routeName: string, params?: any, label: string }): React.ReactElement {
        return (
            <Text to={routeName} params={params} theme={sidebarTheme} style={{
                ...breadcrumbs.includes(routeName) && {
                    color: "white",
                    textDecorationColor: "white",
                }
            }}>
                {label}
            </Text>
        );
    }

    return (
        <View>
            <Text theme={sidebarTheme} style={{fontWeight: "bold", marginTop: 10, marginBottom: 8}}>Desktop Sidebar</Text>
            <SidebarItem routeName="HomeStack" label="Home"/>
            <SidebarItem routeName="Home2Stack" label="Home2"/>
            <SidebarItem routeName="BlankScreen" label="Blank"/>

            <Text onPress={GlobalStore.themeToggle} theme={sidebarTheme}>Toggle Theme</Text>

        </View>
    );
});
