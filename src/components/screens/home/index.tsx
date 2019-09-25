import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {usePrivacy} from "../../../hooks/usePrivacy";
import {StoreState} from "../../../reducers";
import {resetAuth, toggleTheme} from "../../../actions";
import {ScreenDefaultLayout} from "../../layouts/ScreenDefault.layout";
import {Button, Lorem, Paragraph, Text, Title} from "../../modules";
import {HeaderHomeSection} from "./header";

export function Home (): React.ReactElement {
    usePrivacy(["identified"]);
    const pageMeta = {
        title: "Home",
    };
    const userId = useSelector((state: StoreState) => state.auth.userId);
    const dispatch = useDispatch();
    const viewportInfo = useSelector((state: StoreState) => state.viewportInfo);

    return (
        <ScreenDefaultLayout
            header={HeaderHomeSection} pageMeta={pageMeta}
            scrollViewProps={{
                style: {
                    ...viewportInfo.isSmall && {'paddingTop': 54},
                }
            }}
        >
            {viewportInfo.isLarge && <Title>RNav Universal</Title>}
            <Paragraph>
                Click <Text onPress={() => dispatch(toggleTheme())}>here</Text> to toggle theme.
            </Paragraph>

            <Paragraph>
                UserId: {userId} <Text onPress={() => dispatch(resetAuth())}>Logout</Text>
            </Paragraph>

            <Lorem/>
            <Button to="HomeInner" params={{slug: "inner"}} mode="contained">Goto Home Inner</Button>
        </ScreenDefaultLayout>
    );
}

// Wrap screens in class components so that HMR reloads the screen instead of the entire navigator. Is
// fixed in react-native 0.61, whenever Expo upgrades to it.
// Ref: https://github.com/facebook/react-native/issues/26498
export class HomeScreen extends React.PureComponent {
    render () { return <Home />}
}
