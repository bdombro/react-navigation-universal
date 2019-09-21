import React from "react";
import {observer} from "mobx-react-lite";
import {Lorem} from "../lib/Lorem";
import {ScreenDefaultLayout} from "../layout/ScreenDefault.layout";
import {Button, Paragraph, Text, Title} from "../elements";
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
                <Text to="HomeInner" params={{slug: "inner"}}>This</Text><Text> is a
                Text</Text>
            </Paragraph>
            <Button to="HomeInner" params={{slug: "inner"}} mode="contained">Goto Home Inner</Button>
        </ScreenDefaultLayout>
    );
});
// Wrap screens in class components so that HMR reloads the screen instead of the navigator.
// Ref: https://github.com/facebook/react-native/issues/13240#issuecomment-291246975
export class HomeScreen extends React.PureComponent {
    render () { return <Home />}
}
