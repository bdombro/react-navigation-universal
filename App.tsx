import "./src/lib/filterConsole";
import {hot} from 'react-hot-loader';
import * as React from "react";
import {Platform} from "react-native";
import {Provider as PaperProvider} from './src/components/modules';
import {useSelector} from 'react-redux';
import {Navigation} from "./src/components/modules/navigation";
import {StoreState} from "./src/reducers";
import {StoreContainer} from "./src/components/containers/Store.container";
import {watchViewport} from "./src/hooks/watchViewport";

export function AppGuts(): React.ReactElement {
    watchViewport();
    const theme = useSelector((state: StoreState) => state.theme);
    return (
        <PaperProvider theme={theme}>
            <Navigation theme={theme}/>
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

