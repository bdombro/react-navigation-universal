/**
 * This files declares the routes/navigators for the application
 *
 * Tip: We currently employ persistent caching of the nav state. If you make
 * changes, you need to clear the cache by uncommenting a line in
 * loadNavigationState
 */
import React from "react";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Platform} from "react-native";
import {createBrowserApp as createAppContainerWeb} from '@react-navigation/web';
import {createAppContainer as createAppContainerNative} from "react-navigation";
import {createNavigator, SwitchRouter} from "react-navigation";
import {createStackNavigator, NavigationStackConfig} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {fadeIn} from "react-navigation-transitions";
import {TabLayout} from "./components/layouts/Tab.layout";
import {GlobalLayout} from "./components/layouts/Global.layout";
import {IndexScreen} from "./components/screens/index";
import {LoginScreen} from "./components/screens/login";
import {HomeScreen} from "./components/screens/home";
import {Home2Screen} from "./components/screens/home2";
import {HomeInnerScreen} from "./components/screens/home-inner";
import {BlankScreen} from "./components/screens/blank";
import {ThemeConfig} from "./config/Theme.config";
import {getViewportInfo} from "./lib/getViewportInfo";

const createAppContainer = Platform.OS === 'web' ? createAppContainerWeb : createAppContainerNative;

export type RouterProps = {
    theme: typeof ThemeConfig.light
};

export function Router({theme}: RouterProps) {
    const viewportInfo = getViewportInfo();

    const stackConfigDefault: NavigationStackConfig = {
        ...viewportInfo.isLarge && {transitionConfig: () => fadeIn()},
        headerMode: "none",
    };

    const RouterApp = createAppContainer(
        createNavigator(
            GlobalLayout,
            SwitchRouter({

                IndexScreen: {screen: IndexScreen, path: ''},

                TabNavigator: {
                    path: '',
                    screen: createNavigator(
                        TabLayout,
                        SwitchRouter({
                            Tabs: {
                                path: '',
                                screen: createMaterialBottomTabNavigator({
                                    HomeStack: {
                                        path: "home",
                                        navigationOptions: {
                                            tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name="home" size={25} color={tintColor}/>,
                                        },
                                        screen: createStackNavigator({
                                            Home: {screen: HomeScreen, path: ""},
                                            HomeInner: {screen: HomeInnerScreen, path: ":slug"},
                                        }, stackConfigDefault)
                                    },
                                    Home2Stack: {
                                        path: "home2",
                                        navigationOptions: {
                                            tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name="home" size={25} color={tintColor}/>,
                                        },
                                        screen: createStackNavigator({
                                            Home2: {screen: Home2Screen, path: ""}
                                        }, stackConfigDefault)
                                    },
                                }, {
                                    labeled: false,
                                    shifting: false,
                                    barStyle: {backgroundColor: theme.colors.background},
                                    defaultNavigationOptions: {
                                        ...viewportInfo.isLarge && {'tabBarVisible': false},
                                    },
                                }),
                            },
                        }),
                        {}
                    )
                },

                BlankScreen: {path: "blank", screen: BlankScreen},
                LoginScreen: {path: "login", screen: LoginScreen},
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
}
