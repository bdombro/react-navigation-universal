import React from "react";
import {observer} from "mobx-react-lite";
import {Lorem} from "../lib/Lorem";
import {ScreenDefaultLayout} from "../lib/ScreenDefaultLayout";
import {Button, ButtonLink, TextLink, Paragraph, Text, Title} from "../elements/paper";
import {HeaderHomeSection} from "../sections/HeaderHome.section";
import {GlobalState} from "../../GlobalState";

export const Home = observer(function Home () {
    const pageMeta = {
        title: "Home",
    };

    return (
        <ScreenDefaultLayout
            header={HeaderHomeSection} pageMeta={pageMeta}
            scrollViewProps={{
                style: {
                    ...GlobalState.viewportInfo.isSmall && {'paddingTop': 54},
                }
            }}
        >
            {GlobalState.viewportInfo.isLarge && <Title>RNav Universal</Title>}
            <Lorem/>
            <Paragraph>
                <TextLink to="HomeInner" params={{slug: "inner"}}>This</TextLink><Text> is a
                TextLink</Text>
            </Paragraph>
            <Button onPress={GlobalState.toggleTheme}>Click to Toggle Theme</Button>
            <ButtonLink to="HomeInner" params={{slug: "inner"}} mode="contained">Goto Home Inner</ButtonLink>
        </ScreenDefaultLayout>
    );
});
// Wrap screens in class components so that HMR reloads the screen instead of the navigator.
// Ref: https://github.com/facebook/react-native/issues/13240#issuecomment-291246975
export class HomeScreen extends React.PureComponent {
    render () { return <Home />}
}
