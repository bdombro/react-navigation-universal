import * as React from "react";
import {Button, Paragraph, Title} from "../../modules";
import {ScreenBlankLayout} from "../../containers/ScreenBlank.layout";

export function ErrorNotFound (): React.ReactElement {
    const pageMeta = {
        title: "404",
        description: "The page you request cannot be found.",
    };

    return (
        <ScreenBlankLayout
            pageMeta={pageMeta}
            scrollViewProps={{
                style: {paddingTop: 100, maxWidth: 300, alignSelf: "center"}
            }}
        >
            <Title>{pageMeta.title}</Title>
            <Paragraph>{pageMeta.description}</Paragraph>
            <Button to="Home" mode="contained">Go Home</Button>
        </ScreenBlankLayout>
    );
};

// Wrap screens in class components so that HMR reloads the screen instead of the entire navigator. Is
// fixed in react-native 0.61, whenever Expo upgrades to it.
// Ref: https://github.com/facebook/react-native/issues/26498
export class ErrorNotFoundScreen extends React.PureComponent {
    render () { return <ErrorNotFound />}
}
