import React from 'react'
import {
    ScrollView,
    ScrollViewProps,
    Dimensions, Platform, NativeSyntheticEvent, NativeScrollEvent, View,
} from 'react-native';
import {
    withNavigation,
    NavigationInjectedProps,
} from "@react-navigation/core";
import {FooterSection} from "../sections/Footer.section";
import {setWebPageMeta, WebPageMeta} from "../../lib/Polyfills";
import {HeaderDefaultSection} from "../sections/HeaderDefault.section";
import {SafeAreaView} from "react-navigation";
import {GlobalState} from "../../GlobalState";

class ScreenDefaultLayoutBase extends React.Component<NavigationInjectedProps & {
    pageMeta: Partial<WebPageMeta>,
    header?: React.ReactNode,
    scrollViewProps?: ScrollViewProps,
}, {
    scrollOffset: number,
    scrollUpOffset: number,
}> {
    scrollViewRef;
    componentDidFocusSubscription: any;

    constructor(props) {
        super(props);
        this.state = {
            scrollOffset: 0,
            scrollUpOffset: 0,
        };
    }


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

    private _onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollOffsetNext = event.nativeEvent.contentOffset.y;
        if (scrollOffsetNext !== this.state.scrollOffset) {
            this.setState({
                scrollOffset: scrollOffsetNext,
                scrollUpOffset: Math.min(Math.max(this.state.scrollUpOffset + this.state.scrollOffset - scrollOffsetNext, 0), 80)
            });
        }

        if (this.props.scrollViewProps && this.props.scrollViewProps.onScroll) {
            this.props.scrollViewProps.onScroll(event);
        }
    };

    render() {
        const scrollViewOnScrollProps = {
            scrollEventThrottle: 100,
            onScroll: this._onScroll,
        };

        const headerProps = {
            navigation: this.props.navigation,
            title: this.props.pageMeta.headerTitle || this.props.pageMeta.title,
            scrollOffset: this.state.scrollOffset,
            scrollUpOffset: this.state.scrollUpOffset,
        };


        return <View style={{backgroundColor: GlobalState.theme.dark ? "#333" : "white",}}>
            {this.props.header
                ? <this.props.header {...headerProps}/>
                : <HeaderDefaultSection {...headerProps}/>
            }

            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    ref={ref => this.scrollViewRef = ref}
                    {...this.props.scrollViewProps}
                    {...scrollViewOnScrollProps}
                    style={{
                        ...this.props.scrollViewProps && this.props.scrollViewProps.style,
                        ...Platform.OS === 'web' && {height: "calc( 100vh - 44px )"},
                    }}
                >
                    {this.props.children}
                    <FooterSection/>
                    <View style={{
                        ...GlobalState.viewportInfo.isSmall && {paddingBottom: 60}
                    }}/>
                </ScrollView>
            </SafeAreaView>
        </View>;
    }
}

export const ScreenDefaultLayout = withNavigation(ScreenDefaultLayoutBase);

