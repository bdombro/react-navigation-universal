import React from "react";
import {Dimensions, View} from "react-native";
import {Text} from "../elements";
import {GlobalState} from "../../GlobalState";
import {observer} from "mobx-react-lite";

export const FooterSection = observer(function FooterSection () {
    const isLarge = Dimensions.get('window').width > 720;

    return isLarge && (
        <View
            style={{
                alignItems: "center",
                backgroundColor: GlobalState.theme.dark ? GlobalState.theme.colors.primaryDark : GlobalState.theme.colors.primaryLight,
                paddingVertical: 30
            }}
        >
            <Text>Thar be footer!</Text>
        </View>
    );
});
