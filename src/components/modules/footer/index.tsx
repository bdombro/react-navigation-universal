import React from "react";
import {View} from "react-native";
import {observer} from "mobx-react-lite";
import {GlobalState} from "../../../GlobalState";
import {Text} from "../index";

export const FooterSection = observer(function FooterSection (): React.ReactElement {
    return GlobalState.viewportInfo.isLarge && (
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
