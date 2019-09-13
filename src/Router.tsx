import React from "react";
import {Home} from "./components/screens/Home";
import {Home2} from "./components/screens/Home2";
import {HomeInner} from "./components/screens/HomeInner";
import {
    createAppContainer,
    createBottomTabNavigator,
    createNavigator,
    createStackNavigator, Link,
    SwitchRouter
} from "./components/lib/Routing";
import {MaterialIcons} from '@expo/vector-icons';
import {Blank} from "./components/screens/Blank";
import {AsyncStorage, Dimensions, Platform, View} from "react-native";
import {Avatar} from "react-native-elements";
import {AppLayout} from "./components/lib/AppLayout";
// import {fromRight} from "react-navigation-transitions";

const isLarge = Dimensions.get('window').width > 720;

const stackDefaultNavigatorOptions = {
    [isLarge && 'headerRight']: <>
        <Link to="Blank">
            <View style={{marginLeft: 10}}>
                <MaterialIcons name="notifications-none" size={22} color="#999"/>
                {/*<MaterialIcons name="notifications-active" size={22} color="rgba(200,0,0,.8)"/>*/}
                {/*{!notificationQuery.loading && !!notificationQuery.data.length && (*/}
                <MaterialIcons
                    name="broken-image"
                    size={10}
                    color="red"
                    style={{
                        width: 10,
                        height: 10,
                        position: 'relative',
                        top: -22,
                        left: 12,
                        marginBottom: -8
                    }}
                />
            </View>
        </Link>
        <Link to="Blank">
            <Avatar
                title="BD"
                rounded
                containerStyle={{marginLeft: 10}}
            />
        </Link>
    </>,
    headerLeftContainerStyle: {
        [isLarge && 'paddingLeft']: 190,
    },
    headerTitleContainerStyle: {
        [isLarge && 'display']: 'none',
    },
    headerStyle: {
        [isLarge && 'backgroundColor']: "#ddd",
    },
};

const stackConfigDefault = {
    defaultNavigationOptions: stackDefaultNavigatorOptions,
    // transitionConfig: () => fromRight(),
    headerBackTitleVisible: false,
    // headerLayoutPreset: "center",
};

const HomeStack = {
    path: "home",
    navigationOptions: {
        title: "Home",
        tabBarIcon: ({tintColor}) => (
            <MaterialIcons name="home" size={25} color={tintColor}/>
        ),
        drawerIcon: ({tintColor}) => (
            <MaterialIcons name="home" size={25} color={tintColor}/>
        ),
    },
    screen: createStackNavigator({
        Home: {screen: Home, path: ""},
        HomeInner: {screen: HomeInner, path: ":slug"},
    }, stackConfigDefault)
};

const Home2Stack = {
    path: "home2",
    navigationOptions: {
        title: "Home2",
        tabBarIcon: ({tintColor}) => (
            <MaterialIcons name="home" size={25} color={tintColor}/>
        ),
        drawerIcon: ({tintColor}) => (
            <MaterialIcons name="home" size={25} color={tintColor}/>
        ),
    },
    screen: createStackNavigator({
        Home2: {screen: Home2, path: ""}
    }, stackConfigDefault)
};

const FooterNavigator = createBottomTabNavigator({
    HomeStack,
    Home2Stack,
}, {
    // @ts-ignore
    // tabBarOptions: {activeTintColor: 'tomato', inactiveTintColor: 'gray',},
    lazy: true,
    defaultNavigationOptions: {
        [isLarge && 'tabBarVisible']: false,
    },
});


const RouterBase = createAppContainer(createNavigator(
    AppLayout,
    SwitchRouter({
        Tabs: {
            path: "",
            screen: FooterNavigator,
        },
        Blank: {screen: Blank, path: "blank"},
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
    if (Platform.OS === 'web') return;
    return JSON.parse(await AsyncStorage.getItem("router"));
};

export const Router = () => <RouterBase persistNavigationState={persistNavigationState}
                                        loadNavigationState={loadNavigationState}/>;

// export const Router = createAppContainer(FooterNavigator);
