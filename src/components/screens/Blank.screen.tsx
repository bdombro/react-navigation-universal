import React from "react";
import {MaterialIcons} from '@expo/vector-icons';
import {ButtonLink, Title} from "../elements/paper";
import {Lorem} from "../lib/Lorem";
import {ScreenDefaultLayout} from "../lib/ScreenDefaultLayout";

export function Blank () {
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
}

// Wrap screens in class components so that HMR reloads the screen instead of the navigator.
// Ref: https://github.com/facebook/react-native/issues/13240#issuecomment-291246975
export class BlankScreen extends React.PureComponent {
    static navigationOptions = ({navigation}) => ({
        path: "blank",
        tabBarIcon: ({tintColor}) => (
            <MaterialIcons name="check-box-outline-blank" size={25} color={tintColor}/>
        ),
    });
    render () { return <Blank />}
}
