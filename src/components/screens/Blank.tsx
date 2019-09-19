import React from "react";
import {MaterialIcons} from '@expo/vector-icons';
import {ButtonLink, Title} from "../elements";
import {Lorem} from "../lib/Lorem";
import {ScreenDefaultLayout} from "../lib/ScreenDefaultLayout";

export const Blank = () => {
    const pageMeta = {
        title: "Blank",
        description: "This is a blank page with no sidebar or header",
    };

    return (
        <ScreenDefaultLayout pageMeta={pageMeta}>
            <Title>{pageMeta.title}</Title>
            <ButtonLink to="Home" mode="contained">Go Home</ButtonLink>
            <Lorem/>
        </ScreenDefaultLayout>
    );
};
Blank.navigationOptions = ({navigation}) => ({
    path: "blank",
    tabBarIcon: ({tintColor}) => (
        <MaterialIcons name="check-box-outline-blank" size={25} color={tintColor}/>
    ),
});
