import {View} from "react-native";
import {SceneView} from "react-navigation";
import React from "react";
import {observer} from "mobx-react-lite";

export const GlobalLayout = observer(function GlobalLayout(
    {
        descriptors,
        navigation
    }: any, // TODO Typecast this
) {
    const activeKey = navigation.state.routes[navigation.state.index].key;
    const descriptor = descriptors[activeKey];

    return (
        <View style={{flex: 1, width: '100%', overflow: 'hidden'}}>
            <SceneView navigation={descriptor.navigation} component={descriptor.getComponent()}
                       screenProps={{}}/>
        </View>
    );
});
