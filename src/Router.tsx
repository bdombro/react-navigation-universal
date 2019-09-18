/**
 * This files declares the routes/navigators for the application
 *
 * Tip: We currently employ persistent caching of the nav state. If you make
 * changes, you need to clear the cache by uncommenting a line in
 * loadNavigationState
 */
import React from "react";
import {Home} from "./components/screens/Home";
import {Home2} from "./components/screens/Home2";
import {HomeInner} from "./components/screens/HomeInner";
import {
    createAppContainer,
    createMaterialBottomTabNavigator,
    createNavigator,
    createStackNavigator, SwitchRouter
} from "./components/lib/Routing";
import {MaterialIcons} from '@expo/vector-icons';
import {Blank} from "./components/screens/Blank";
import {AsyncStorage, Dimensions, Platform, View} from "react-native";
import {Avatar} from "react-native-paper";
import {AppLayout} from "./components/lib/AppLayout";
import {Link} from "./components/elements/links/Link";
// import {fromRight} from "react-navigation-transitions";

// TODO: Consider watching isLarge instead of only at start.
const isLarge = Dimensions.get('window').width > 720;

const stackDefaultNavigatorOptions = {
};

const stackConfigDefault = {
    defaultNavigationOptions: stackDefaultNavigatorOptions,
    // transitionConfig: () => fromRight(),
    headerMode: "none",
};

const HomeStack = {
    path: "home",
    navigationOptions: {
        tabBarIcon: ({tintColor}) => <MaterialIcons name="home" size={25} color={tintColor}/>,
    },
    screen: createStackNavigator({
        Home: {screen: Home, path: ""},
        HomeInner: {screen: HomeInner, path: ":slug"},
    }, stackConfigDefault)
};

const Home2Stack = {
    path: "home2",
    navigationOptions: {
        tabBarIcon: ({tintColor}) => <MaterialIcons name="home" size={25} color={tintColor}/>,
    },
    screen: createStackNavigator({
        Home2: {screen: Home2, path: ""}
    }, stackConfigDefault)
};

const FooterNavigator = createMaterialBottomTabNavigator({
    HomeStack,
    Home2Stack,
    Blank,
    Blank2: Blank,
    Blank3: Blank,
}, {
    lazy: Platform.OS === 'web',
    labeled: false,
    defaultNavigationOptions: {
        [isLarge && 'tabBarVisible']: false,
    },
});

// TODO: 404 handling
const RouterBase = createAppContainer(createNavigator(
    AppLayout,
    SwitchRouter({
        Tabs: {
            path: "",
            screen: FooterNavigator,
        },
        // Blank,
    }),
    {}
));

const persistNavigationState = async (navState) => {
    if (Platform.OS === 'web') return;
    try {
        await AsyncStorage.setItem("router", JSON.stringify(navState))
    } catch (err) {
        // handle the error according to your needs
    }
};
const loadNavigationState = async () => {
    await AsyncStorage.removeItem("router"); // resets the state
    if (Platform.OS === 'web') return;
    return JSON.parse(await AsyncStorage.getItem("router"));
};

export const Router = () => <RouterBase persistNavigationState={persistNavigationState}
                                        loadNavigationState={loadNavigationState}/>;

// export const Router = createAppContainer(FooterNavigator);
