import React from "react";
import {useNavigation} from "react-navigation-hooks";
import {useDispatch} from "react-redux";
import {usePrivacyRedirectFrom} from "../../../hooks/usePrivacy";
import {Button, Title} from "../../modules";
import {ScreenBlankLayout} from "../../layouts/ScreenBlank.layout";
import {setAuth} from "../../../actions";

// TODO: Make a logout route
export function Login (): React.ReactElement {
    const pageMeta = {
        title: "Login",
    };
    const {navigate} = useNavigation();
    const dispatch = useDispatch();

    return (
        <ScreenBlankLayout pageMeta={pageMeta} scrollViewProps={{style: {paddingVertical: 100, maxWidth: 300, alignSelf: "center"}}}>
            <Title>Welcome.</Title>
            <Button onPress={async () => {
                dispatch(setAuth({userId: "12345", token: "1234567890", roles: ["admin", "identified"]}));
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
