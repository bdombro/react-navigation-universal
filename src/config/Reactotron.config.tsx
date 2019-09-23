import {AsyncStorage} from "react-native";
import Reactotron from 'reactotron-react-native';
import { mst } from "reactotron-mst"

Reactotron
    .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
    .configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .use(mst())
    .connect(); // let's connect!

export {Reactotron};
