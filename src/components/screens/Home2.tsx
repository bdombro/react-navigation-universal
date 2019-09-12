import React from "react";
import {Text} from "react-native-elements";
import {Lorem} from "../lib/Lorem";
import {ScreenScrollView, ScreenScrollViewNavigationOptions} from "../lib/ScreenScrollView";
import {Helmet} from "../lib/Helmet";

export const Home2 = () => {
    const title = "Home2";
    return <>
        {/*<Helmet title={title}/>*/}
        <ScreenScrollView title={title}>
            <Text h1>{title}</Text>
            <Lorem/>
        </ScreenScrollView>
    </>;
};
Home2.navigationOptions = ({navigation}) => ({
    ...ScreenScrollViewNavigationOptions({navigation}),
    title: "Home2"
});
