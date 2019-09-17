import React from 'react'
import {
    NativeSyntheticEvent,
    NativeScrollEvent,
    ScrollView,
    ScrollViewProps,
    Platform, Dimensions,
} from 'react-native';
import {
    withNavigation,
    NavigationInjectedProps,
} from "@react-navigation/core";
import {FooterSection} from "../sections/Footer.section";
import {setWebPageMeta, WebPageMeta} from "../../lib/Polyfills";
import {GlobalState} from "../../GlobalState";




class ScreenViewBase extends React.Component<NavigationInjectedProps & {scrollViewProps?: ScrollViewProps, pageMeta: Partial<WebPageMeta>}> {
    scrollViewRef;
    componentDidFocusSubscription: any;

    componentDidMount() {
        this.componentDidFocusSubscription = this.props.navigation.addListener('willFocus', () => {
            setWebPageMeta(this.props.pageMeta);
            GlobalState.currentPageTitle = this.props.pageMeta.title;

            // RN scrolls automatically in the UX, but does not handle scrolling on initial page load in web.
            if (Platform.OS === "web") {
                let scrollOffset = this.props.navigation.getParam('scrollOffset');
                if (scrollOffset) this.scrollViewRef.scrollTo({x: 0, y: scrollOffset, animated: false});
            }
        });
    }
    componentDidUpdate() {
        setWebPageMeta(this.props.pageMeta);
        GlobalState.currentPageTitle = this.props.pageMeta.title;
    }
    componentWillUnmount(): void {
        this.componentDidFocusSubscription.remove();
    }

    private _onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollOffset = this.props.navigation.getParam('scrollOffset');
        const scrollOffsetNext = event.nativeEvent.contentOffset.y;
        if (scrollOffsetNext !== scrollOffset) {
            this.props.navigation.setParams({
                scrollOffset: scrollOffsetNext,
            });
        }

        if (this.props.scrollViewProps && this.props.scrollViewProps.onScroll) {
            this.props.scrollViewProps.onScroll(event);
        }
    };

    render() {
        const {children, scrollViewProps} = this.props;

        const isLarge = Dimensions.get('window').width > 720;
        let scrollViewOnScrollProps = {};
        if (!isLarge || true) scrollViewOnScrollProps = {
            scrollEventThrottle: 1,
            onScroll: this._onScroll,
        };

        return <>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                ref={ref => this.scrollViewRef = ref}
                {...scrollViewProps}
                {...scrollViewOnScrollProps}
            >
                {children}
                <FooterSection/>
            </ScrollView>
        </>;
    }
}

export const ScreenView = withNavigation(ScreenViewBase);

export function ScreenViewNavigationOptions({navigation}: any) {
    GlobalState.currentPageScrollOffset = navigation.getParam("scrollOffset", null);

    return {

    }
}
