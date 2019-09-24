import React from "react";
import {hot} from 'react-hot-loader';
import {Platform} from "react-native";
import {Provider as PaperProvider} from 'react-native-paper';
import {Observer} from "mobx-react-lite";
import {reaction, toJS} from "mobx";
import {contains} from "ramda"
import "./src/lib/filterConsole";
import {GlobalState} from "./src/GlobalState";
import {BackButtonHandler, exitRoutes} from "./src/navigation";
import {RootStore, RootStoreProvider, setupRootStore} from "./src/models/root-store";
import {RootNavigator} from "./src/navigation/root-navigator";

if (__DEV__)
    import('./src/config/reactotron').then(() => console.log('Reactotron Configured'))

import {createBrowserApp as createAppContainerWeb} from '@react-navigation/web';
import {createAppContainer as createAppContainerNative} from "react-navigation";
const createAppContainer = Platform.OS === 'web' ? createAppContainerWeb : createAppContainerNative;

/**
 * Are we allowed to exit the app?  This is called when the back button
 * is pressed on android.
 *
 * @param routeName The currently active route name.
 */
const canExit = (routeName: string) => contains(routeName, exitRoutes);

class App extends React.PureComponent<any, { rootStore: RootStore | undefined }> {
    constructor(props) {
        super(props);
        this.state = {
            rootStore: undefined,
        }
    }

    componentDidMount() {
        setupRootStore().then(rootStore => this.setState({rootStore: rootStore}));
    }

    componentDidUpdate() {
        setupRootStore().then(rootStore => this.setState({rootStore: rootStore}));
    }


    render() {
        if (!this.state.rootStore) {
            return null
        }
        const NavApp = createAppContainer(RootNavigator);
        return (
            <Observer>{() => {
                reaction(() => GlobalState.forceRenderCount, count => {
                    console.log(`Forcing Rerender: Count ${count}`);
                    this.forceUpdate();
                });
                return (
                    <RootStoreProvider value={this.state.rootStore}>
                        <PaperProvider theme={toJS(GlobalState.theme)}>
                            <BackButtonHandler canExit={canExit}>
                                <NavApp/>
                            </BackButtonHandler>
                        </PaperProvider>
                    </RootStoreProvider>
                )
            }}</Observer>
        );
    }
}

let HotApp = App;
if (Platform.OS === 'web') HotApp = hot(module)(App);
export default HotApp;
