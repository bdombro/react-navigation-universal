import React from "react";
import {Dimensions, View} from "react-native";
import {SceneView} from "react-navigation";
import {useSelector} from "react-redux";
import {StoreState} from "../../reducers";
import {SidebarDefault} from "../modules/sidebar-default";

const isLarge = Dimensions.get('window').width > 720;

export function TabLayout({descriptors, navigation}: any): React.ReactElement {
    const theme = useSelector((state: StoreState) => state.theme);
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
                        backgroundColor: theme.dark ? "#242424" : theme.colors.primaryDark,
                    }}
                >
                    <SidebarDefault/>
                </View>
            )}
    </>;
};
