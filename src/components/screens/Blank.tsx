import React from "react";
import {MaterialIcons} from '@expo/vector-icons';
import {ButtonLink, Title} from "../elements";
import {Lorem} from "../lib/Lorem";
import {ScreenView, ScreenViewNavigationOptions} from "../lib/ScreenView";

export const Blank = () => {
    const PageMeta = {
        title: "Blank",
        description: "This is a blank page with no sidebar or header",
    };

    return <>
        <ScreenView pageMeta={PageMeta}>
            <Title>{PageMeta.title}</Title>
            <ButtonLink to="Home" mode="contained">Go Home</ButtonLink>
            <Lorem/>
        </ScreenView>
    </>;
};
Blank.navigationOptions = ({navigation}) => ({
    ...ScreenViewNavigationOptions({navigation}),
    path: "blank",
    tabBarIcon: ({tintColor}) => (
        <MaterialIcons name="check-box-outline-blank" size={25} color={tintColor}/>
    ),
});
