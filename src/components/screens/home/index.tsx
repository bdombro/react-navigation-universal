import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {usePrivacy} from "../../../hooks/usePrivacy";
import {StoreState} from "../../../reducers";
import {toggleTheme} from "../../../actions";
import {ScreenDefaultLayout} from "../../containers/ScreenDefault.layout";
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
            Header={HeaderHomeSection} pageMeta={pageMeta}
            scrollViewProps={{
                style: {
                    padding: 10,
                    ...viewportInfo.isSmall && {'paddingTop': 54 + 10},
                }
            }}
        >
            {viewportInfo.isLarge && <Title>RNav Universal</Title>}

            <Paragraph>
                This is a demonstration of how one can use react-navigation@4 + react-redux@7 on Native + Web using expo@33+.
            </Paragraph>
            <Paragraph>
                Note: The header on this page animates on mobile, which works well on-device but not-so-much on simulator.
            </Paragraph>
            <Paragraph>
                Click <Text onPress={() => dispatch(toggleTheme())}>here</Text> to toggle theme.
            </Paragraph>

            <Paragraph>
                UserId: {userId} <Text to="LogoutScreen">Logout</Text>
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
