import React from "react";
import {hot} from 'react-hot-loader';
import {Platform} from "react-native";
import {Provider as PaperProvider} from 'react-native-paper';
import {Observer} from "mobx-react-lite";
import {reaction, toJS} from "mobx";
import "./src/lib/filterConsole";
import {Router} from "./src/Router";
import {GlobalState} from "./src/GlobalState";

if(__DEV__) {
    import('./src/config/Reactotron.config').then(() => console.log('Reactotron Configured'))
}

class App extends React.PureComponent {
    render() {
        return (
            <Observer>{() => {
                reaction(() => GlobalState.forceRenderCount, count => {
                    console.log(`Forcing Rerender: Count ${count}`);
                    this.forceUpdate();
                });
                return (
                    <PaperProvider theme={toJS(GlobalState.theme)}>
                        <Router theme={GlobalState.theme}/>
                    </PaperProvider>
                )
            }}</Observer>
        );
    }
}

let HotApp = App;
if (Platform.OS === 'web') HotApp = hot(module)(App);
export default HotApp;
