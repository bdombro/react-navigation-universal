import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {GlobalState} from "../../../GlobalState";
import {ScreenDefaultLayout} from "../../layouts/ScreenDefault.layout";
import {Button, Paragraph, Text, Title} from "../../modules";
import {HeaderHomeSection} from "./header";
// import {GlobalStore} from "../../../state/global-store";
import {usePrivacy} from "../../../hooks/usePrivacy";
import {Lorem} from "../../modules";

export const Home = observer(function Home (): React.ReactElement {
    usePrivacy(["identified"]);
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
            <Paragraph>
                Click <Text onPress={GlobalState.toggleTheme}>here</Text> to toggle theme.
            </Paragraph>

            <Paragraph>
                {/*UserId: {GlobalStore.user.id} <Text onPress={GlobalStore.user.logout} to="LoginScreen">Logout</Text>*/}
            </Paragraph>

            <Lorem/>
            <Button to="HomeInner" params={{slug: "inner"}} mode="contained">Goto Home Inner</Button>
        </ScreenDefaultLayout>
    );
});
// Wrap screens in class components so that HMR reloads the screen instead of the entire navigator. Is
// fixed in react-native 0.61, whenever Expo upgrades to it.
// Ref: https://github.com/facebook/react-native/issues/26498
export class HomeScreen extends React.PureComponent {
    render () { return <Home />}
}
