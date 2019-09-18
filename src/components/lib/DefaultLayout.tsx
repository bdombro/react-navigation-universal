import {Dimensions, View} from "react-native";
import {SceneView} from "react-navigation";
import React from "react";
import {SidebarModule} from "../modules/Sidebar.module";
import {HeaderDefaultSection} from "../sections/HeaderDefault.section";
import {GlobalState} from "../../GlobalState";
import {observer} from "mobx-react-lite";

const isLarge = Dimensions.get('window').width > 720;

export const DefaultLayout = observer(function AppLayout (
    {
        descriptors,
        navigation
    } : any, // TODO Typecast this
    ) {
    const activeKey = navigation.state.routes[navigation.state.index].key;
    const descriptor = descriptors[activeKey];

    return (
        <View style={{flex: 1, width: '100%', overflow: 'hidden'}}>
            {GlobalState.currentPage.isFullScreen
                ? <SceneView navigation={descriptor.navigation} component={descriptor.getComponent()} screenProps={{}}/>
                : <>
                    <View style={{flex: 1, flexDirection: "row"}}>
                        <View style={{width: isLarge ? 200 : 0}}/>
                        <View style={{flex: 1}}>

                            <SceneView navigation={descriptor.navigation} component={descriptor.getComponent()} screenProps={{}}/>
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
                </>
            }
        </View>
    );
});
