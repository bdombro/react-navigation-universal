import * as React from "react";
import {useNavigation} from "react-navigation-hooks";
import {Platform} from "react-native";
import {usePrivacy} from "../../../hooks/usePrivacy";
import {ScreenDefaultLayout} from "../../containers/ScreenDefault.layout";
import {Lorem, Title} from "../../modules";

export function HomeInner (): React.ReactElement {
    usePrivacy(["identified"]);
    const {getParam, setParams} = useNavigation();
    const slug = getParam('slug');
    const [state, setState] =React.useState({
        seo: {
            title: "",
            description: "",
        }
    });

    const fetchData = () => {
        setState({...state, seo: {title: slug, description: slug}});
        if(Platform.OS !== 'web') setParams({title: slug});
    };

   React.useEffect(fetchData, []);
   React.useEffect(fetchData, [slug]);

    return (
        <ScreenDefaultLayout
            pageMeta={state.seo}
            scrollViewProps={{
                style: {
                    padding: 10,
                }
            }}
        >
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
