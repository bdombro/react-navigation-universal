import React from 'react'
import {
    ScrollView,
    ScrollViewProps,
    View,
} from 'react-native';
import {NavigationInjectedProps, withNavigation} from "react-navigation";
import {setWebPageMeta, WebPageMeta} from "../../lib/Polyfills";
import {GlobalState} from "../../GlobalState";

export class ScreenBlankLayoutBase extends React.Component<NavigationInjectedProps & {
    pageMeta: Partial<WebPageMeta>,
    scrollViewProps?: ScrollViewProps,
}> {
    componentDidFocusSubscription: any;

    componentDidMount() {
        this.componentDidFocusSubscription = this.props.navigation.addListener('willFocus', () => {
            setWebPageMeta(this.props.pageMeta);
        });

        // RN scrolls automatically in the UX, but does not handle scrolling on initial page load in web.
        // if (Platform.OS === "web") {
        //     let scrollOffset = this.props.navigation.getParam('scrollOffset');
        //     if (scrollOffset) this.scrollViewRef.scrollTo({x: 0, y: scrollOffset, animated: false});
        // }
    }

    componentDidUpdate() {
        setWebPageMeta(this.props.pageMeta);
    }

    componentWillUnmount(): void {
        this.componentDidFocusSubscription.remove();
    }

    render() {
        return <View style={{backgroundColor: GlobalState.theme.dark ? "#333" : "white",}}>
            <ScrollView contentInsetAdjustmentBehavior="automatic"{...this.props.scrollViewProps}>
                {this.props.children}
            </ScrollView>
        </View>;
    }
}

export const ScreenBlankLayout = withNavigation(ScreenBlankLayoutBase);
