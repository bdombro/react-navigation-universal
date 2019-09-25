import React from "react";
import {useNavigation} from "react-navigation-hooks";
import {GlobalStore} from "../../../state/global-store";
import {usePrivacyRedirectFrom} from "../../../hooks/usePrivacy";
import {Button, Title} from "../../modules";
import {ScreenBlankLayout} from "../../layouts/ScreenBlank.layout";

export function Login (): React.ReactElement {
    const pageMeta = {
        title: "Login",
    };
    const {navigate} = useNavigation();

    return (
        <ScreenBlankLayout pageMeta={pageMeta} scrollViewProps={{style: {paddingTop: 100, maxWidth: 300, alignSelf: "center"}}}>
            <Title>Welcome.</Title>
            <Button onPress={async () => {
                GlobalStore.userSet({id: "12345", token: "1234567890", roles: ["admin", "identified"]});
                if (usePrivacyRedirectFrom) navigate(usePrivacyRedirectFrom);
                else navigate("HomeStack")
            }} mode="contained">Login</Button>
        </ScreenBlankLayout>
    );
}

// Wrap screens in class components so that HMR reloads the screen instead of the entire navigator. Is
// fixed in react-native 0.61, whenever Expo upgrades to it.
// Ref: https://github.com/facebook/react-native/issues/26498
export class LoginScreen extends React.PureComponent {
    render () { return <Login />}
}
