import React, {useLayoutEffect, useState} from 'react'
import {
    ScrollView,
    ScrollViewProps,
    Platform,
    NativeSyntheticEvent,
    NativeScrollEvent,
    View,
} from 'react-native';
import {
    withNavigation,
    NavigationInjectedProps,
} from "@react-navigation/core";
import {SafeAreaView} from "react-navigation";
import {connect, useSelector} from "react-redux";
import {setWebPageMeta, WebPageMeta} from "../../lib/webPageMeta";
import {StoreState, Theme, ViewportInfo} from "../../reducers";
import {FooterSection, HeaderDefaultSection} from "../modules";
import {useFocusState, useNavigation} from "react-navigation-hooks";
import {SidebarLayout} from "./Sidebar.layout";

// class ScreenDefaultLayoutBase extends React.Component<NavigationInjectedProps & {
//     theme: Theme,
//     viewportInfo: ViewportInfo,
//     pageMeta: Partial<WebPageMeta>,
//     header?: React.ReactNode,
//     scrollViewProps?: ScrollViewProps,
// }, {
//     scrollOffset: number,
//     scrollUpOffset: number,
// }> {
//     scrollViewRef;
//     componentDidFocusSubscription: any;
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             scrollOffset: 0,
//             scrollUpOffset: 0,
//         };
//     }
//
//
//     componentDidMount() {
//         this.componentDidFocusSubscription = this.props.navigation.addListener('willFocus', () => {
//             setWebPageMeta(this.props.pageMeta);
//         });
//
//         // RN scrolls automatically in the UX, but does not handle scrolling on initial page load in web.
//         // if (Platform.OS === "web") {
//         //     let scrollOffset = this.props.navigation.getParam('scrollOffset');
//         //     if (scrollOffset) this.scrollViewRef.scrollTo({x: 0, y: scrollOffset, animated: false});
//         // }
//     }
//
//     componentDidUpdate() {
//         setWebPageMeta(this.props.pageMeta);
//     }
//
//     componentWillUnmount(): void {
//         this.componentDidFocusSubscription.remove();
//     }
//
//     private _onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//         const scrollOffsetNext = event.nativeEvent.contentOffset.y;
//         if (scrollOffsetNext !== this.state.scrollOffset) {
//             this.setState({
//                 scrollOffset: scrollOffsetNext,
//                 scrollUpOffset: Math.min(Math.max(this.state.scrollUpOffset + this.state.scrollOffset - scrollOffsetNext, 0), 80)
//             });
//         }
//
//         if (this.props.scrollViewProps && this.props.scrollViewProps.onScroll) {
//             this.props.scrollViewProps.onScroll(event);
//         }
//     };
//
//     render() {
//         const Header = this.props.header || HeaderDefaultSection;
//
//         return (
//             <View style={{backgroundColor: this.props.theme.dark ? "#333" : "white",}}>
//                 <Header
//                     navigation={this.props.navigation}
//                     title={this.props.pageMeta.headerTitle || this.props.pageMeta.title}
//                     scrollOffset={this.state.scrollOffset}
//                     scrollUpOffset={this.state.scrollUpOffset}
//                 />
//
//                 <SafeAreaView>
//                     <ScrollView
//                         contentInsetAdjustmentBehavior="automatic"
//                         ref={ref => this.scrollViewRef = ref}
//                         scrollEventThrottle={100}
//                         onScroll={this._onScroll}
//                         {...this.props.scrollViewProps}
//                         style={{
//                             ...this.props.scrollViewProps && this.props.scrollViewProps.style,
//                             ...Platform.OS === 'web' && {height: "calc( 100vh - 44px )"},
//                         }}
//                     >
//                         {this.props.children}
//                         <FooterSection/>
//                         <View style={{
//                             ...this.props.viewportInfo.isSmall && {paddingBottom: 60}
//                         }}/>
//                     </ScrollView>
//                 </SafeAreaView>
//             </View>
//         );
//     }
// }
//
// const mapStateToProps = (state: StoreState) => ({
//     theme: state.theme,
//     viewportInfo: state.viewportInfo,
// });
//
// const ScreenDefaultLayoutWithState = connect(
//     mapStateToProps,
// )(ScreenDefaultLayoutBase);

// export const ScreenDefaultLayout = withNavigation(ScreenDefaultLayoutWithState);

export function ScreenDefaultLayout(
    {
        pageMeta,
        scrollViewProps = {},
        Header = HeaderDefaultSection,
        children,
    }: {
        pageMeta: Partial<WebPageMeta>,
        scrollViewProps?: ScrollViewProps,
        Header?: typeof HeaderDefaultSection,
        children: React.ReactNode,
    }
) {
    function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
        const scrollOffsetNext = event.nativeEvent.contentOffset.y;
        if (scrollOffsetNext !== scrollOffsets.absolute) {

            setScrollOffsets({
                absolute: scrollOffsetNext,
                up: Math.min(Math.max(scrollOffsets.up + scrollOffsets.absolute - scrollOffsetNext, 0), 80)
            });
        }
        if (scrollViewProps.onScroll) scrollViewProps.onScroll(event);
    }

    const {isFocusing, isFocused} = useFocusState();
    const theme = useSelector((state: StoreState) => state.theme);
    const navigation = useNavigation();
    const viewportInfo = useSelector((state: StoreState) => state.viewportInfo);
    const [scrollOffsets, setScrollOffsets] = useState({absolute: 0, up: 0});

    useLayoutEffect(() => {
        if (isFocusing || isFocused)
            setWebPageMeta(pageMeta);
    }, [isFocusing, isFocused]);

    return (
        <View style={{backgroundColor: theme.dark ? "#333" : "white",}}>
            <SidebarLayout>
                <Header
                    navigation={navigation}
                    title={pageMeta.title}
                    scrollOffset={scrollOffsets.absolute}
                    scrollUpOffset={scrollOffsets.up}
                />

                <SafeAreaView>
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        scrollEventThrottle={100}
                        onScroll={onScroll}
                        {...scrollViewProps}
                        style={{
                            // @ts-ignore spread type warning
                            ...scrollViewProps.style,
                            ...Platform.OS === 'web' && {height: "calc( 100vh - 44px )"},
                        }}
                    >
                        {children}
                        <FooterSection/>
                        <View style={{
                            ...viewportInfo.isSmall && {paddingBottom: 60}
                        }}/>
                    </ScrollView>
                </SafeAreaView>
            </SidebarLayout>
        </View>
    );
}

