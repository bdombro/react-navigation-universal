import React from 'react'
import {
    ScrollView,
    ScrollViewProps,
    View,
} from 'react-native';
import {NavigationInjectedProps, withNavigation} from "react-navigation";
import {setWebPageMeta, WebPageMeta} from "../../lib/webPageMeta";
import {StoreState, Theme} from "../../reducers";
import {connect} from "react-redux";

export class ScreenBlankLayoutBase extends React.Component<NavigationInjectedProps & {
    theme: Theme,
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
        return <View style={{flex: 1, width: '100%', backgroundColor: this.props.theme.dark ? "#333" : "white",}}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" {...this.props.scrollViewProps}>
                {this.props.children}
            </ScrollView>
        </View>;
    }
}

const mapStateToProps = (state: StoreState) => ({
    theme: state.theme,
});

const ScreenBlankLayoutBaseWithState = connect(
    mapStateToProps,
)(ScreenBlankLayoutBase);

export const ScreenBlankLayout = withNavigation(ScreenBlankLayoutBaseWithState);
