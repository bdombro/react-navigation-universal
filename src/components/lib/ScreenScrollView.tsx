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
import {Helmet} from "./Helmet";
import {withNavigationFocus} from "./Routing";

class ScreenScrollViewBase extends React.Component<ScrollViewProps & NavigationInjectedProps> {

    // componentDidMount(): void {
    //     // titleGlobal = this.props.title;
    //     this.componentDidFocusSubscription = this.props.navigation.addListener('willBlur', () => {
    //         titleGlobal = "";
    //         this.props.navigation.setParams({});
    //     });
    //     this.componentDidFocusSubscription = this.props.navigation.addListener('willFocus', () => {
    //         console.log("willfocus");
    //         if (Platform.OS === 'web') {
    //             let scrollOffsetNext = this.scrollView.getScrollableNode().scrollTop;
    //             if (scrollOffsetNext !== scrollOffsetGlobal) {
    //                 scrollOffsetGlobal = scrollOffsetNext;
    //             }
    //             this.props.navigation.setParams({});
    //         }
    //     });
    //
    //     // this.componentDidFocusSubscription = this.props.navigation.addListener('didFocus', () => {
    //     //     titleGlobal = this.props.title;
    //     //     this.props.navigation.setParams({});
    //     // });
    // }
    //
    // componentWillUnmount(): void {
    //     this.componentDidFocusSubscription.remove();
    // }

    private _onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        let scrollOffset = this.props.navigation.getParam('scrollOffset');
        let scrollOffsetNext = event.nativeEvent.contentOffset.y;
        if (scrollOffsetNext !== scrollOffset) {
            this.props.navigation.setParams({
                scrollOffset: scrollOffsetNext,
            });
        }

        if (this.props.onScroll) {
            this.props.onScroll(event);
        }
    };

    render() {
        const {children, ...props} = this.props;

        const isLarge = Dimensions.get('window').width > 720;
        let scrollViewOnScrollProps = {};
        if (!isLarge) scrollViewOnScrollProps = {
            scrollEventThrottle: 1,
            onScroll: this._onScroll,
        };

        return <>
            <Helmet title={this.props.title}/>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"

                style={{
                    [Platform.OS === 'web' && 'height']: "calc( 100vh - 44px )"
                }}
                {...props}
                {...scrollViewOnScrollProps}
            >
                {children}
                <FooterSection/>
            </ScrollView>
        </>;
    }
}

export const ScreenScrollView = withNavigationFocus(withNavigation(ScreenScrollViewBase));

export function ScreenScrollViewNavigationOptions({navigation}: any) {
    const scrollOffset = navigation.getParam("scrollOffset", 0);

    let opacity = 1;
    // console.dir(scrollOffset);

    const isLarge = Dimensions.get('window').width > 720;
    let start = isLarge ? 40 : 60;


    if (scrollOffset <= start) {
        opacity = 0;
    } else if (scrollOffset <= start * 2) {
        opacity = scrollOffset / start / 2;
    }

    if (navigation.getParam('headerTitleStyle', {opacity: null}).opacity === opacity) return {};
    return {
        headerTitleStyle: {
            opacity,
        },
        headerStyle: {
            [isLarge && 'height']: 44,
            [isLarge && 'backgroundColor']: "#ddd",
            borderBottomColor: `rgba(200,200,200,${opacity})`,
            // boxShadow: `rgba(0, 0, 0, ${opacity / 2}) 0px 2px 4px -1px`,
            // boxShadow: `rgba(0, 0, 0, ${.2 + opacity / 4}) 0px 2px 4px -1px`,
            boxShadow: "none",
        }
    }
}
