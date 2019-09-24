import React from "react";
import {usePrivacy} from "../../../hooks/usePrivacy";
import {Lorem, Title} from "../../modules";
import {ScreenDefaultLayout} from "../../layouts/ScreenDefault.layout";

export function Home2(): React.ReactElement {
    usePrivacy(["identified"]);
    const pageMeta = {
        title: "Home2",
        description: "This is Home2.",
    };

    return (
        <ScreenDefaultLayout pageMeta={pageMeta}>
            <Title>{pageMeta.title}</Title>
            <Lorem/>
        </ScreenDefaultLayout>
    );
}

// Wrap screens in class components so that HMR reloads the screen instead of the entire navigator. Is
// fixed in react-native 0.61, whenever Expo upgrades to it.
// Ref: https://github.com/facebook/react-native/issues/26498
export class Home2Screen extends React.PureComponent {
    render() {
        return <Home2/>
    }
}