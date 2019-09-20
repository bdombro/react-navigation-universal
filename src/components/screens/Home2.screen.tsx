import React from "react";
import {Title} from "../elements/paper";
import {Lorem} from "../lib/Lorem";
import {ScreenDefaultLayout} from "../lib/ScreenDefaultLayout";

export function Home2() {
    const pageMeta = {
        title: "Home2",
        description: "This is Home2.",
    };
    console.log("Rendering");

    return (
        <ScreenDefaultLayout pageMeta={pageMeta}>
            <Title>{pageMeta.title}</Title>
            <Lorem/>
        </ScreenDefaultLayout>
    );
}

// Wrap screens in class components so that HMR reloads the screen instead of the navigator.
// Ref: https://github.com/facebook/react-native/issues/13240#issuecomment-291246975
export class Home2Screen extends React.PureComponent {
    render() {
        return <Home2/>
    }
}
