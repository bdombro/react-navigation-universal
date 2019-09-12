import React from "react";
import {Text} from "react-native-elements";
import {Lorem} from "../lib/Lorem";
import {ScreenScrollView, ScreenScrollViewNavigationOptions} from "../lib/ScreenScrollView";
import {ButtonLink, TextLink} from "../lib/Routing";

export const Home = () => {
    const title = "Home";
    return <>
        <ScreenScrollView title={title}>
            <Text h1>{title}</Text>
            <Lorem/>
            <Text><TextLink to="HomeInner" params={{slug: "inner"}}>This</TextLink><Text> is a textlink</Text></Text>
            <ButtonLink to="HomeInner" params={{slug: "inner"}} title="Goto Home Inner" />
        </ScreenScrollView>
    </>;
};
Home.navigationOptions = ({navigation}) => ({
    ...ScreenScrollViewNavigationOptions({navigation}),
    title: "Home"
});
