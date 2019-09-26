import * as React from "react";
import {usePrivacy} from "../../../hooks/usePrivacy";
import {ScreenDefaultLayout} from "../../containers/ScreenDefault.layout";
import {Lorem, Title} from "../../modules";
import {useSelector} from "react-redux";
import {StoreState} from "../../../reducers";

export function Home2(): React.ReactElement {
    usePrivacy(["identified"]);
    const viewportInfo = useSelector((state: StoreState) => state.viewportInfo);
    const pageMeta = {
        title: "Home2",
        description: "This is Home2.",
    };

    return (
        <ScreenDefaultLayout
            pageMeta={pageMeta}
            scrollViewProps={{
                style: {
                    padding: 10,
                }
            }}
        >
            {viewportInfo.isLarge && <Title>{pageMeta.title}</Title>}
            <Lorem/>
        </ScreenDefaultLayout>
    );
}

// Wrap screens in class components so that HMR reloads the screen instead of the entire navigator. Is
// fixed in react-native 0.61, whenever Expo upgrades to it.
// Ref: https://github.com/facebook/react-native/issues/26498
export class Home2Screen extends React.PureComponent {
    render() {
        return <Home2/>
    }
}
