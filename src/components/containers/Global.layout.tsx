import React from "react";
import {View} from "react-native";
import {SceneView} from "react-navigation";
import {useSelector} from "react-redux";
import {StoreState} from "../../reducers";

export function GlobalLayout({descriptors, navigation}: any): React.ReactElement {
    const activeKey = navigation.state.routes[navigation.state.index].key;
    const descriptor = descriptors[activeKey];
    const theme = useSelector((state: StoreState) => state.theme);

    return (
        <View style={{flex: 1, width: '100%', overflow: 'hidden', backgroundColor: theme.colors.background}}>
            <SceneView navigation={descriptor.navigation} component={descriptor.getComponent()}
                       screenProps={{}}/>
        </View>
    );
}
