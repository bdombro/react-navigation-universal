import * as React from "react";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Animated, View} from "react-native";
import {NavigationScreenProp} from "react-navigation";
import {useSelector} from "react-redux";
import {checkGoBackIsAvailable} from "../../../lib/checkGoBackIsAvailable";
import {StoreState} from "../../../reducers";
import {Appbar, Avatar, IconButton, Link} from '../';

export type HeaderDefaultSectionProps = {
    navigation: NavigationScreenProp<any>,
    title: string,
    scrollOffset: number,
    scrollUpOffset: number,
};

export function HeaderDefaultSection({navigation, title, scrollOffset}: HeaderDefaultSectionProps): React.ReactElement {
    const goBackIsAvailable =React.useMemo(() => checkGoBackIsAvailable(navigation), [navigation.state]);
    const theme = useSelector((state: StoreState) => state.theme);
    const viewportInfo = useSelector((state: StoreState) => state.viewportInfo);

    React.useEffect(() => {
        if (viewportInfo.isSmall) titleOpacity.setValue(1);
        else titleOpacity.setValue(
            Math.min(Math.max(scrollOffset / 80 - .5, 0), 1)
        );
    }, [scrollOffset]);


    const [titleOpacity] =React.useState(new Animated.Value(0));

    return (
        <Appbar.Header
            testID="HeaderDefault"
            style={{
                backgroundColor: theme.colors.background,
                elevation: 0,
                ...viewportInfo.isLarge && {height: 46}
            }}
        >
            {goBackIsAvailable && <Appbar.BackAction onPress={() => navigation.goBack()}/>}
            <Appbar.Content
                title={
                    <Animated.Text style={{
                        opacity: titleOpacity
                    }}>{title}</Animated.Text>
                }
            />


            {viewportInfo.isLarge && <>
                <IconButton icon="magnify" to="BlankScreen" size={22}
                            color={theme.colors.text}/>
                <View>
                    <IconButton icon="bell-outline" to="BlankScreen" size={22} color={theme.colors.text}/>
                    {/*{!notificationQuery.loading && !!notificationQuery.data.length && (*/}
                    <MaterialCommunityIcons
                        name="alert-box"
                        size={10}
                        color="red"
                        style={{
                            width: 10,
                            height: 10,
                            position: 'relative',
                            top: -34,
                            left: 23,
                            marginBottom: -10
                        }}
                    />
                </View>
                <Link to="BlankScreen">
                    <Avatar.Text
                        size={32}
                        label="BD"
                        style={{marginLeft: 10}}
                    />
                </Link>
                <IconButton
                    icon="dots-vertical"
                    to="BlankScreen"
                    size={22}
                    color={theme.colors.text}
                    style={{marginLeft: -5, marginRight: -12}}
                />
            </>}


        </Appbar.Header>
    );
}
