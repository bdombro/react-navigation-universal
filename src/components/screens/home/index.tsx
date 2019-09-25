import React from "react";
import {observer} from "mobx-react-lite";
import {GlobalStore} from "../../../state/global-store";
import {usePrivacy} from "../../../hooks/usePrivacy";
import {Button, Lorem, Paragraph, Text, Title} from "../../modules";
import {ScreenDefaultLayout} from "../../layouts/ScreenDefault.layout";
import {HeaderHomeSection} from "./header";

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
                    ...GlobalStore.viewportInfo.isSmall && {'paddingTop': 54},
                }
            }}
        >
            {GlobalStore.viewportInfo.isLarge && <Title>RNav Universal</Title>}
            <Paragraph>
                Click <Text onPress={GlobalStore.themeToggle}>here</Text> to toggle theme.
            </Paragraph>

            <Paragraph>
                UserId: {GlobalStore.user.id} <Text onPress={GlobalStore.userReset}>Logout</Text>
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
