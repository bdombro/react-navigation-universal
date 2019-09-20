import React from "react";
import {Lorem} from "../lib/Lorem";
import {ScreenDefaultLayout} from "../lib/ScreenDefaultLayout";
import {ButtonLink, TextLink, Paragraph, Text, Title} from "../elements/paper";
import {HeaderHomeSection} from "../sections/HeaderHome.section";
import {GlobalState} from "../../GlobalState";
import {observer} from "mobx-react-lite";

export const Home = observer(function Home () {
    const pageMeta = {
        title: "Home",
    };

    return (
        <ScreenDefaultLayout
            header={HeaderHomeSection} pageMeta={pageMeta}
            scrollViewProps={{
                style: {
                    ...GlobalState.viewportInfo.isSmall && {'paddingTop': 54},
                }
            }}
        >
            {GlobalState.viewportInfo.isLarge && <Title>RNav Universal</Title>}
            <Lorem/>
            <Paragraph>
                <TextLink to="HomeInner" params={{slug: "inner"}}>This</TextLink><Text> is a
                TextLink</Text>
            </Paragraph>
            <ButtonLink to="HomeInner" params={{slug: "inner"}} mode="contained">Goto Home Inner</ButtonLink>
        </ScreenDefaultLayout>
    );
});
