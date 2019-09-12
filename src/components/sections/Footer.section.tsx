import React from "react";
import {Dimensions, View} from "react-native";
import {Text} from "react-native-elements";

export const FooterSection = () => {
    const isLarge = Dimensions.get('window').width > 720;

    return isLarge && (
        <View style={{alignItems: "center", backgroundColor: "#aaa", paddingVertical: 30}}>
            <Text>THar be footer.</Text>
        </View>
    );
};
