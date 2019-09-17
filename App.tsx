import React from "react";
import {hot} from 'react-hot-loader';
import {Platform} from "react-native";
import {Provider as PaperProvider} from 'react-native-paper';
import {Router} from "./src/Router";
import {ThemeConfig} from "./src/config/Theme.config";

class App extends React.PureComponent {
    render() {
        return (
            <PaperProvider theme={ThemeConfig}>
                <Router/>
            </PaperProvider>
        );
    }
}

let HotApp = App;
if (Platform.OS === 'web') HotApp = hot(module)(App);
export default HotApp;
