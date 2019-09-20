import React from "react";
import {Title} from "../elements/paper";
import {Lorem} from "../lib/Lorem";
import {ScreenDefaultLayout} from "../lib/ScreenDefaultLayout";


export function Home2 () {
    const pageMeta = {
        title: "Home2",
        description: "This is Home2.",
    };

    return (
        <ScreenDefaultLayout pageMeta={pageMeta}>
            <Title>{pageMeta.title}</Title>
            <Lorem/>
        </ScreenDefaultLayout>
    );
}
