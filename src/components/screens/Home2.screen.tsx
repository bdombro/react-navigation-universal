import React from "react";
import {Title} from "../elements";
import {Lorem} from "../lib/Lorem";
import {ScreenDefaultLayout} from "../layout/ScreenDefault.layout";

export function Home2() {
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

// Wrap screens in class components so that HMR reloads the screen instead of the navigator.
// Ref: https://github.com/facebook/react-native/issues/13240#issuecomment-291246975
export class Home2Screen extends React.PureComponent {
    render() {
        return <Home2/>
    }
}
