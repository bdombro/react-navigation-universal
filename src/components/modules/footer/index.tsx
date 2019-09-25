import React from "react";
import {View} from "react-native";
import {observer} from "mobx-react-lite";
import {Text} from "../index";
import {GlobalStore} from "../../../state/global-store";

export const FooterSection = observer(function FooterSection (): React.ReactElement {
    return GlobalStore.viewportInfo.isLarge && (
        <View
            style={{
                alignItems: "center",
                backgroundColor: GlobalStore.theme.dark ? GlobalStore.theme.colors.primaryDark : GlobalStore.theme.colors.primaryLight,
                paddingVertical: 30
            }}
        >
            <Text>Thar be footer!</Text>
        </View>
    );
});
