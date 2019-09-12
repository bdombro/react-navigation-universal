import React, {useEffect, useState} from "react";
import {Text} from "react-native-elements";
import {Lorem} from "../lib/Lorem";
import {ScreenScrollView, ScreenScrollViewNavigationOptions} from "../lib/ScreenScrollView";
import {useNavigation} from "react-navigation-hooks";

export const HomeInner = () => {
    const {getParam, setParams} = useNavigation();
    const slug = getParam('slug');
    const [state, setState] = useState({
        title: "",
    });

    const fetchData = () => {
        setState({...state, title: slug});
        setParams({});
    };

    useEffect(fetchData, []);
    useEffect(fetchData, [slug]);

    return (
        <ScreenScrollView title={state.title}>
            <Text h1>URL Param: {state.title}</Text>
            <Lorem/>
        </ScreenScrollView>
    );
};
HomeInner.navigationOptions = ({navigation}) => ({
    title: "HomeInner",
    ...ScreenScrollViewNavigationOptions({navigation}),
});
