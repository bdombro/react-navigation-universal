import React from "react";
import {Button, Paragraph, Title} from "../elements";
import {ScreenBlankLayout} from "../layout/ScreenBlank.layout";

export const ErrorNotFound = () => {
    const pageMeta = {
        title: "404",
        description: "The page you request cannot be found.",
    };

    return (
        <ScreenBlankLayout pageMeta={pageMeta} scrollViewProps={{style: {paddingTop: 100, maxWidth: 300, alignSelf: "center"}}}>
            <Title>{pageMeta.title}</Title>
            <Paragraph>{pageMeta.description}</Paragraph>
            <Button to="Home" mode="contained">Go Home</Button>
        </ScreenBlankLayout>
    );
};

// Wrap screens in class components so that HMR reloads the screen instead of the navigator.
// Ref: https://github.com/facebook/react-native/issues/13240#issuecomment-291246975
export class ErrorNotFoundScreen extends React.PureComponent {
    render () { return <ErrorNotFound />}
}
