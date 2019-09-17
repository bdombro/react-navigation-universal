import {Dimensions, View} from "react-native";
import {SceneView} from "./Routing";
import React from "react";
import {SidebarModule} from "../modules/Sidebar.module";
import {HeaderSection} from "../sections/Header.section";

const isLarge = Dimensions.get('window').width > 720;

export const AppLayout = ({descriptors, navigation}) => {
    const activeKey = navigation.state.routes[navigation.state.index].key;
    const descriptor = descriptors[activeKey];

    return (
        <View style={{flex: 1, width: '100%', overflow: 'hidden'}}>
            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={{width: isLarge ? 200 : 0}}/>
                <View style={{flex: 1}}>
                    <HeaderSection/>
                    <SceneView navigation={descriptor.navigation} component={descriptor.getComponent()}/>
                </View>
            </View>
            {isLarge && (
                <View
                    // @ts-ignore: ignore untyped position fixed
                    style={{
                        position: "fixed", top: 0, left: 0, bottom: 0, width: 200, zIndex: 9999,
                        backgroundColor: "rgb(100,100,255)"
                    }}
                >
                    <SidebarModule/>
                </View>
            )}
        </View>
    );
};
