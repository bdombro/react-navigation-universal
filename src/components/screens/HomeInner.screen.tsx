import React, {useEffect, useState} from "react";
import {useNavigation} from "react-navigation-hooks";
import {Platform} from "react-native";
import {Lorem} from "../lib/Lorem";
import {ScreenDefaultLayout} from "../layout/ScreenDefault.layout";
import {Title} from "../elements";

export function HomeInner () {
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

// Wrap screens in class components so that HMR reloads the screen instead of the navigator.
// Ref: https://github.com/facebook/react-native/issues/13240#issuecomment-291246975
export class HomeInnerScreen extends React.PureComponent {
    render() {
        return <HomeInner/>
    }
}
