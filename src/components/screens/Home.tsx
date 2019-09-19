import React from "react";
import {Lorem} from "../lib/Lorem";
import {ScreenView, ScreenViewNavigationOptions} from "../lib/ScreenView";
import {ButtonLink, TextLink, Paragraph, Text, Title} from "../elements";
import {HeaderHomeSection} from "../sections/HeaderHome.section";
import {GlobalState} from "../../GlobalState";
import {observer} from "mobx-react-lite";

export const Home = observer(function Home () {
    const PageMeta = {
        title: "Home"
    };

    return (
        <ScreenView pageMeta={PageMeta} scrollViewProps={{style: {
            [GlobalState.viewportInfo.isSmall && 'paddingTop']: 54,
        }}}>
            <Lorem/>
            <Paragraph>
                <TextLink to="HomeInner" params={{slug: "inner"}}>This</TextLink><Text> is a
                TextLink</Text>
            </Paragraph>
            <ButtonLink to="HomeInner" params={{slug: "inner"}} mode="contained">Goto Home Inner</ButtonLink>
        </ScreenView>
    );
});
Home.navigationOptions = ({navigation}) =>({
    ...ScreenViewNavigationOptions({navigation}),
    header: headerProps => <HeaderHomeSection headerProps={headerProps} screenNavigation={navigation} />,
});
