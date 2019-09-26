import "./src/lib/filterConsole";
import {hot} from 'react-hot-loader';
import React from "react";
import {Platform} from "react-native";
import {Provider as PaperProvider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RouterContainer} from "./src/components/containers/Router.container";
import {StoreState} from "./src/reducers";
import {StoreContainer} from "./src/components/containers/Store.container";
import {watchViewport} from "./src/hooks/watchViewport";

// TODO: Testing

function AppGuts(): React.ReactElement {
    watchViewport();
    const theme = useSelector((state: StoreState) => state.theme);
    return (
        <PaperProvider theme={theme}>
            <RouterContainer theme={theme}/>
        </PaperProvider>
    );
}

let HotAppGuts = AppGuts;
if (Platform.OS === 'web') HotAppGuts = hot(module)(AppGuts);

class App extends React.PureComponent {
    render() {
        return (
            <StoreContainer>
                <HotAppGuts/>
            </StoreContainer>
        );
    }
}

export default App;

