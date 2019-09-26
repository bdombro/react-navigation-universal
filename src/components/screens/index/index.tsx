import * as React from "react";
import {useNavigation} from "react-navigation-hooks";
import {Platform} from "react-native";
import {ErrorNotFoundScreen} from "../error-not-found";

export function IndexScreen (): React.ReactElement {
    const {navigate} = useNavigation();

    React.useLayoutEffect(() => {
        if (Platform.OS !== 'web') navigate('HomeStack');
        else if (Platform.OS === 'web' && window.location.pathname === '/') navigate('HomeStack');
    });

    return <ErrorNotFoundScreen />;
};
