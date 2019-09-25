import React from "react";
import {hot} from 'react-hot-loader';
import {Platform} from "react-native";
import {Provider as PaperProvider} from 'react-native-paper';
import {Observer} from "mobx-react-lite";
import {reaction, toJS} from "mobx";
import "./src/lib/filterConsole";
import {Router} from "./src/Router";
import {GlobalStore} from "./src/state/global-store";

if(__DEV__) {
    import('./src/config/Reactotron.config')
}

class App extends React.PureComponent {
    render() {
        return (
            <Observer>{() => {
                reaction(() => GlobalStore.forceRenderCount, count => {
                    console.log(`Forcing Rerender: Count ${count}`);
                    this.forceUpdate();
                });
                return (
                    <PaperProvider theme={toJS(GlobalStore.theme)}>
                        <Router theme={GlobalStore.theme}/>
                    </PaperProvider>
                )
            }}</Observer>
        );
    }
}

let HotApp = App;
if (Platform.OS === 'web') HotApp = hot(module)(App);
export default HotApp;
