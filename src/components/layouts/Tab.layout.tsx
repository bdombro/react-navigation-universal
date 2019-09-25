import React from "react";
import {Dimensions, View} from "react-native";
import {SceneView} from "react-navigation";
import {observer} from "mobx-react-lite";
import {SidebarDefault} from "../modules/sidebar-default";
import {GlobalStore} from "../../state/global-store";

const isLarge = Dimensions.get('window').width > 720;

export const TabLayout = observer(function TabLayout({descriptors, navigation}: any): React.ReactElement {
    const activeKey = navigation.state.routes[navigation.state.index].key;
    const descriptor = descriptors[activeKey];

    return <>
            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={{width: isLarge ? 200 : 0}}/>
                <View style={{flex: 1}}>

                    <SceneView navigation={descriptor.navigation} component={descriptor.getComponent()}
                               screenProps={{}}/>
                </View>
            </View>
            {isLarge && (
                <View
                    // @ts-ignore: ignore untyped position fixed
                    style={{
                        position: "fixed", top: 0, left: 0, bottom: 0, width: 200, zIndex: 9999,
                        backgroundColor: GlobalStore.theme.dark ? "#242424" : GlobalStore.theme.colors.primaryDark,
                    }}
                >
                    <SidebarDefault/>
                </View>
            )}
    </>;
});
