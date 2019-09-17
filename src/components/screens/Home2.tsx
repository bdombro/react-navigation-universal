import React from "react";
import {Title} from "../elements";
import {Lorem} from "../lib/Lorem";
import {ScreenView, ScreenViewNavigationOptions} from "../lib/ScreenView";


export const Home2 = () => {
    const PageMeta = {
        title: "Home2",
        description: "This is Home2.",
    };

    return <>
        <ScreenView pageMeta={PageMeta}>
            <Title>{PageMeta.title}</Title>
            <Lorem/>
        </ScreenView>
    </>;
};
Home2.navigationOptions = ({navigation}) => ({
    ...ScreenViewNavigationOptions({navigation}),
});
