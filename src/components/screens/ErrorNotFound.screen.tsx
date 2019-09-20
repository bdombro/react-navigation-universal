import React from "react";
import {ButtonLink, Paragraph, Title} from "../elements/paper";
import {ScreenDefaultLayout} from "../lib/ScreenDefaultLayout";

export const ErrorNotFound = () => {
    const pageMeta = {
        title: "404",
        description: "The page you request cannot be found.",
    };

    return (
        <ScreenDefaultLayout pageMeta={pageMeta}>
            <Title>{pageMeta.title}</Title>
            <Paragraph>{pageMeta.description}</Paragraph>
            <ButtonLink to="Home" mode="contained">Go Home</ButtonLink>
        </ScreenDefaultLayout>
    );
};

// Wrap screens in class components so that HMR reloads the screen instead of the navigator.
// Ref: https://github.com/facebook/react-native/issues/13240#issuecomment-291246975
export class ErrorNotFoundScreen extends React.PureComponent {
    render () { return <ErrorNotFound />}
}
