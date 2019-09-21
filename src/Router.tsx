/**
 * This files declares the routes/navigators for the application
 *
 * Tip: We currently employ persistent caching of the nav state. If you make
 * changes, you need to clear the cache by uncommenting a line in
 * loadNavigationState
 */
import React from "react";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {AsyncStorage, Dimensions, Platform} from "react-native";
import {createBrowserApp as createAppContainerWeb} from '@react-navigation/web';
import {createAppContainer as createAppContainerNative, createSwitchNavigator} from "react-navigation";
import {createNavigator, SwitchRouter} from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {fadeIn} from "react-navigation-transitions";
import {TabLayout} from "./components/layout/Tab.layout";
import {IndexScreen} from "./components/screens/Index.screen";
import {HomeScreen} from "./components/screens/Home.screen";
import {Home2Screen} from "./components/screens/Home2.screen";
import {HomeInnerScreen} from "./components/screens/HomeInner.screen";
import {BlankScreen} from "./components/screens/Blank.screen";
import {GlobalLayout} from "./components/layout/Global.layout";

const createAppContainer = Platform.OS === 'web' ? createAppContainerWeb : createAppContainerNative;
const isLarge = Dimensions.get('window').width > 720;

const stackDefaultNavigatorOptions = {
    // header: headerProps => <HeaderDefaultSection {...headerProps}/>,
};

const stackConfigDefault = {
    defaultNavigationOptions: stackDefaultNavigatorOptions,
    ...isLarge && {transitionConfig: () => fadeIn()},
    headerMode: "none",
};

const HomeStack = {
    path: "home",
    navigationOptions: {
        tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name="home" size={25} color={tintColor}/>,
    },
    screen: createStackNavigator({
        Home: {screen: HomeScreen, path: ""},
        HomeInner: {screen: HomeInnerScreen, path: ":slug"},
    }, stackConfigDefault)
};

const Home2Stack = {
    path: "home2",
    navigationOptions: {
        tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name="home" size={25} color={tintColor}/>,
    },
    screen: createStackNavigator({
        Home2: {screen: Home2Screen, path: ""}
    }, stackConfigDefault)
};

const CreateDefaultLayoutRoutes = (footerColor: string) => createNavigator(
    TabLayout,
    SwitchRouter({
        Tabs: {
            path: '',
            screen: createMaterialBottomTabNavigator({
                HomeStack,
                Home2Stack
            }, {
                labeled: false,
                shifting: false,
                barStyle: {backgroundColor: footerColor},
                defaultNavigationOptions: {
                    ...isLarge && {'tabBarVisible': false},
                },
            }),
        },
    }),
    {}
);

export function Router({footerColor}) {

    const RouterApp = createAppContainer(
        createNavigator(
            GlobalLayout,
            SwitchRouter({
                IndexScreen: {screen: IndexScreen, path: ''},
                DefaultLayout: {path: '', screen: CreateDefaultLayoutRoutes(footerColor)},
                BlankScreen: {path: "blank", screen: BlankScreen},
            }),
            {}
        ),
    );

    // The following will persist the nav state to localstorage
    // const persistNavigationState = async (navState) => {
    //     if (Platform.OS === 'web') return;
    //     try {
    //         await AsyncStorage.setItem("router", JSON.stringify(navState))
    //     } catch (err) {
    //         // handle the error according to your needs
    //     }
    // };
    // const loadNavigationState = async () => {
    //     await AsyncStorage.removeItem("router"); // resets the state
    //     if (Platform.OS === 'web') return;
    //     return JSON.parse(await AsyncStorage.getItem("router"));
    // };
    //
    // return <RouterApp persistNavigationState={persistNavigationState}
    //                                         loadNavigationState={loadNavigationState}/>;

    return <RouterApp/>;
};
