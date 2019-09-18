import React from "react";
import {Lorem} from "../lib/Lorem";
import {ScreenView, ScreenViewNavigationOptions} from "../lib/ScreenView";
import {ButtonLink, TextLink, Paragraph, Text, Title} from "../elements";
import {HeaderHomeSection} from "../sections/HeaderHome.section";

export function Home () {
    const PageMeta = {
        title: "Home"
    };

    return <>
        <ScreenView pageMeta={PageMeta}>
            <Lorem/>
            <Paragraph>
                <TextLink to="HomeInner" params={{slug: "inner"}}>This</TextLink><Text> is a
                TextLink</Text>
            </Paragraph>
            <ButtonLink to="HomeInner" params={{slug: "inner"}} mode="contained">Goto Home Inner</ButtonLink>
        </ScreenView>
    </>;
}
Home.navigationOptions = ({navigation}) =>({
    ...ScreenViewNavigationOptions({navigation}),
    header: headerProps => <HeaderHomeSection headerProps={headerProps} screenNavigation={navigation} />,
});
