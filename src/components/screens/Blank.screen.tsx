import React from "react";
import {Button, Title} from "../elements";
import {Lorem} from "../lib/Lorem";
import {ScreenBlankLayout} from "../layout/ScreenBlank.layout";

export function Blank () {
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

// Wrap screens in class components so that HMR reloads the screen instead of the navigator.
// Ref: https://github.com/facebook/react-native/issues/13240#issuecomment-291246975
export class BlankScreen extends React.PureComponent {
    static navigationOptions = ({navigation}) => ({
        path: "blank",
    });
    render () { return <Blank />}
}
