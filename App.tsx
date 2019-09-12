import React from "react";
import { hot } from 'react-hot-loader';
import {Platform} from "react-native";
import {Router} from "./src/Router";

class App extends React.PureComponent {
    render() {
        return <Router/>;
    }
}
let HotApp = App;
if (Platform.OS === 'web') HotApp = hot(module)(App);
export default HotApp;
