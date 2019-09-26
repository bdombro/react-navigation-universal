import * as React from "react";
import {View} from "react-native";
import {useSelector} from "react-redux";
import {StoreState} from "../../reducers";
import {SidebarDefault} from "../modules/sidebar-default";

export function SidebarLayout({children}: {children: React.ReactNode}): React.ReactElement {
    const theme = useSelector((state: StoreState) => state.theme);
    const viewportInfo = useSelector((state: StoreState) => state.viewportInfo);

    return <>
            <View testID="SidebarLayout" style={{flex: 1, flexDirection: "row"}}>
                <View style={{width: viewportInfo.isLarge ? 200 : 0}}/>
                <View style={{flex: 1}}>
                    {children}
                </View>
            </View>
            {viewportInfo.isLarge && (
                <View
                    testID="SidebarLayoutFixed"
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
}
