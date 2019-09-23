import React, {useEffect, useState} from "react";
import {useNavigation} from "react-navigation-hooks";
import {Platform} from "react-native";
import {ScreenDefaultLayout} from "../../layouts/ScreenDefault.layout";
import {Paragraph, Title} from "../../modules";
import {Lorem} from "../../modules";

export function HomeInner (): React.ReactElement {
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
        <ScreenDefaultLayout pageMeta={state.seo}>
            <Title>URL Param: {slug}</Title>
            <Lorem/>
        </ScreenDefaultLayout>
    );
}

// Wrap screens in class components so that HMR reloads the screen instead of the entire navigator. Is
// fixed in react-native 0.61, whenever Expo upgrades to it.
// Ref: https://github.com/facebook/react-native/issues/26498
export class HomeInnerScreen extends React.PureComponent {
    render() {
        return <HomeInner/>
    }
}
