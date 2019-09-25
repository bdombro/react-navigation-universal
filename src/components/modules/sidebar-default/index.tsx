import React, {useMemo} from "react";
import {View} from "react-native";
import {useNavigation} from "react-navigation-hooks";
import {useDispatch} from "react-redux";
import {ThemeConfig} from "../../../config/Theme.config";
import {getBreadcrumbsOfActiveRoute} from "../../../lib/getBreadcrumbsOfActiveRoute";
import {toggleTheme} from "../../../actions/theme";
import {Text} from "../";

export function SidebarDefault() {
    const sidebarTheme = ThemeConfig.dark;
    const navigation = useNavigation();
    const breadcrumbs = useMemo(() => getBreadcrumbsOfActiveRoute(navigation.state), [navigation.state]);
    const dispatch = useDispatch();

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

            <Text onPress={() => dispatch(toggleTheme())} theme={sidebarTheme}>Toggle Theme</Text>

        </View>
    );
}
