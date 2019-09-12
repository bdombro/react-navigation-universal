import React from "react";
import {Text} from "react-native-elements";
import {Lorem} from "../lib/Lorem";
import {ButtonLink} from "../lib/Routing";
import {Helmet} from "../lib/Helmet";
import {ScreenScrollView, ScreenScrollViewNavigationOptions} from "../lib/ScreenScrollView";

export const Blank = () => {
    const title = "Blank";

    return <>
        {/*<Helmet title={title}/>*/}
        <ScreenScrollView title={title}>
            <Text h1>{title}</Text>
            <ButtonLink to="Home" title="Go Home"/>
            <Lorem/>
        </ScreenScrollView>
    </>;
};
Blank.navigationOptions = ({navigation}) => ({
    ...ScreenScrollViewNavigationOptions({navigation}),
    title: "Blank",
});
