import {persistReducer, persistStore} from "redux-persist";
import {AsyncStorage} from "react-native";
import {reducers} from "../../reducers";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
// import {Reactotron} from "../../config/Reactotron.config";
import {PersistGate} from "redux-persist/integration/react";
import {Provider as ReduxProvider} from "react-redux";
import * as React from "react";

const persistedReducers = persistReducer({key: 'root', storage: AsyncStorage}, reducers);

// Add support for chrome-redux-dev-tools
// @ts-ignore missing window param
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let enhancers = [applyMiddleware(thunk)];
// if (__DEV__ && NodeEnv !== 'test') {
//     // @ts-ignore untyped feature in reactotron
//     enhancers.push(Reactotron.createEnhancer());
// }
export const store = createStore(persistedReducers, composeEnhancers(...enhancers));
export const persistor = persistStore(store);

export function StoreContainer ({children}: {children: React.ReactNode}): React.ReactElement {
    return (
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </ReduxProvider>
    )
}
