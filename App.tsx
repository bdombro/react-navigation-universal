import React from "react";
import {hot} from 'react-hot-loader';
import {Platform} from "react-native";
import {Provider as PaperProvider} from 'react-native-paper';
import {Router} from "./src/Router";
import {Observer} from "mobx-react-lite";
import {GlobalState} from "./src/GlobalState";
import {reaction, toJS} from "mobx";
import {StackActions} from "react-navigation";

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
                        <Router tabBackgroundColor={GlobalState.theme.colors.background}/>
                    </PaperProvider>
                )
            }}</Observer>
        );
    }
}

let HotApp = App;
if (Platform.OS === 'web') HotApp = hot(module)(App);
export default HotApp;
