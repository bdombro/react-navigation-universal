import * as React from "react";
import {View} from "react-native";
import {Text} from "../index";
// import {Text} from 'react-native';
import {useSelector} from "react-redux";
import {StoreState} from "../../../reducers";

export function FooterSection (): React.ReactElement {
    const theme = useSelector((state: StoreState) => state.theme);
    const viewportInfo = useSelector((state: StoreState) => state.viewportInfo);

    return viewportInfo.isLarge && (
        <View
            testID="FooterSection"
            style={{
                alignItems: "center",
                backgroundColor: theme.dark ? theme.colors.primaryDark : theme.colors.primaryLight,
                paddingVertical: 30
            }}
        >
            <Text>Thar be footer!</Text>
        </View>
    );
}
