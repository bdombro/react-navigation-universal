import React, {useEffect, useState} from "react";
import {useNavigation} from "react-navigation-hooks";
import {Platform} from "react-native";
import {Lorem} from "../lib/Lorem";
import {ScreenView, ScreenViewNavigationOptions} from "../lib/ScreenView";
import {Title} from "../elements";

export const HomeInner = () => {
    const {getParam, setParams} = useNavigation();
    const slug = getParam('slug');
    const [state, setState] = useState({
        seo: {
            title: "",
            description: "",
        }
    });

    const fetchData = () => {
        setState({...state, seo: {title: slug, description: slug}});
        if(Platform.OS !== 'web') setParams({title: slug});
    };

    useEffect(fetchData, []);
    useEffect(fetchData, [slug]);

    return (
        <ScreenView pageMeta={state.seo}>
            <Title>URL Param: {slug}</Title>
            <Lorem/>
        </ScreenView>
    );
};
HomeInner.navigationOptions = ({navigation}) => ({
    ...ScreenViewNavigationOptions({navigation}),
});
