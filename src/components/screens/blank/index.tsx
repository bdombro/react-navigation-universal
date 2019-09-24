import React from "react";
import {usePrivacy} from "../../../hooks/usePrivacy";
import {ScreenBlankLayout} from "../../layouts/ScreenBlank.layout";
import {Button, Lorem, Title} from "../../modules";

export function Blank (): React.ReactElement {
    usePrivacy(["identified"]);
    const pageMeta = {
        title: "Blank Layout",
        description: "This is a blank page with no sidebar or header",
    };

    return (
        <ScreenBlankLayout pageMeta={pageMeta}>
            <Title>{pageMeta.title}</Title>
            <Button to="Home" mode="contained">Go Home</Button>
            <Lorem/>
        </ScreenBlankLayout>
    );
}

// Wrap screens in class components so that HMR reloads the screen instead of the entire navigator. Is
// fixed in react-native 0.61, whenever Expo upgrades to it.
// Ref: https://github.com/facebook/react-native/issues/26498
export class BlankScreen extends React.PureComponent {
    static navigationOptions = ({navigation}) => ({
        path: "blank",
    });
    render () { return <Blank />}
}
