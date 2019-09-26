import {hot} from 'react-hot-loader';
import React, {useEffect} from "react";
import {Dimensions, Platform} from "react-native";
import {Provider as PaperProvider} from 'react-native-paper';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider as ReduxProvider, useDispatch, useSelector} from 'react-redux';
import "./src/lib/filterConsole";
import {Router} from "./src/Router";
import {reducers, StoreState} from "./src/reducers";
import {getViewportInfo} from "./src/lib/getViewportInfo";
import {setViewportInfo} from "./src/actions";
import {Reactotron} from './src/config/Reactotron.config';

// TODO: Testing
// TODO: Persist state to AsyncStorage

// Add support for chrome-redux-dev-tools
// @ts-ignore missing window param
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk),
    // @ts-ignore untyped feature in reactotron
    Reactotron.createEnhancer(),
));

let widthCurrent = Dimensions.get("window").width;

function AppGuts(): React.ReactElement {
    const theme = useSelector((state: StoreState) => state.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            const widthNext = Dimensions.get("window").width;
            if (widthNext !== widthCurrent) {
                widthCurrent = widthNext;
                dispatch(setViewportInfo(getViewportInfo()));
            }
        }, 200);
        return () => clearInterval(interval);
    }, [false]);

    return (
        <PaperProvider theme={theme}>
            <Router theme={theme}/>
        </PaperProvider>
    );
}

let HotAppGuts = AppGuts;
if (Platform.OS === 'web') HotAppGuts = hot(module)(AppGuts);

class App extends React.PureComponent {
    render() {
        return (
            <ReduxProvider store={store}>
                <HotAppGuts/>
            </ReduxProvider>
        );
    }
}

export default App;

