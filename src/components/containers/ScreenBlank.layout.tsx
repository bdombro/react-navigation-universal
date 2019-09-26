import * as React from 'react'
import {
    ScrollView,
    ScrollViewProps,
    View,
} from 'react-native';
import {setWebPageMeta, WebPageMeta} from "../../lib/webPageMeta";
import {StoreState} from "../../reducers";
import {useSelector} from "react-redux";
import {useFocusState} from "react-navigation-hooks";

export function ScreenBlankLayout(
    {
        pageMeta,
        scrollViewProps = {},
        children,
    }: {
        pageMeta: Partial<WebPageMeta>,
        scrollViewProps?: ScrollViewProps,
        children: React.ReactNode,
    }
) {
    const {isFocusing, isFocused} = useFocusState();
    const theme = useSelector((state: StoreState) => state.theme);

    React.useLayoutEffect(() => {
        if (isFocusing || isFocused)
            setWebPageMeta(pageMeta);
    }, [isFocusing, isFocused]);

    return (
        <View testID="ScreenBlankLayout"
              style={{flex: 1, width: '100%', backgroundColor: theme.dark ? "#333" : "white",}}>
            <ScrollView testID="ScreenBlankLayoutScrollView"
                        contentInsetAdjustmentBehavior="automatic"
                        {...scrollViewProps}
            >
                {children}
            </ScrollView>
        </View>
    );
}
