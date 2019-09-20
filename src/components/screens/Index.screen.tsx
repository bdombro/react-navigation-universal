import React from "react";
import {useNavigation} from "react-navigation-hooks";
import {Platform} from "react-native";
import {ErrorNotFoundScreen} from "./ErrorNotFound.screen";

export const Index = () => {
    const {navigate} = useNavigation();
    if (Platform.OS !== 'web') navigate('HomeStack');
    else if (Platform.OS === 'web' && window.location.pathname === '/') navigate('HomeStack');
    else return <ErrorNotFoundScreen />;
    return <></>;
};

// Wrap screens in class components so that HMR reloads the screen instead of the navigator.
// Ref: https://github.com/facebook/react-native/issues/13240#issuecomment-291246975
export class IndexScreen extends React.PureComponent {
    render () { return <Index />}
}
