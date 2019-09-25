import React, {useMemo, useState} from "react";
import {observer} from "mobx-react-lite";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Animated, View} from "react-native";
import {NavigationStackProp} from "react-navigation-stack/src/types";
import {GlobalStore} from "../../../state/global-store";
import {checkGoBackIsAvailable} from "../../../lib/checkGoBackIsAvailable";
import {Appbar, Avatar, IconButton, Link} from '../';

export type HeaderDefaultSectionProps = {
    navigation: NavigationStackProp,
    title: string,
    scrollOffset: number,
    scrollUpOffset: number,
};

export const HeaderDefaultSection = observer(function HeaderDefaultSection(
    {navigation, title, scrollOffset, scrollUpOffset,}: HeaderDefaultSectionProps
): React.ReactElement {
    const goBackIsAvailable = useMemo(() => checkGoBackIsAvailable(navigation), [navigation.state]);

    React.useEffect(() => {
        if (GlobalStore.viewportInfo.isSmall) titleOpacity.setValue(1);
        else titleOpacity.setValue(
            Math.min(Math.max(scrollOffset / 80 - .5, 0), 1)
        );
    }, [scrollOffset]);


    const [titleOpacity] = useState(new Animated.Value(0));

    return (
        <Appbar.Header
            style={{
                backgroundColor: GlobalStore.theme.colors.background,
                elevation: 0,
                ...GlobalStore.viewportInfo.isLarge && {height: 46}
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


            {GlobalStore.viewportInfo.isLarge && <>
                <IconButton icon="magnify" to="BlankScreen" size={22} color={GlobalStore.theme.colors.text}/>
                <View>
                    <IconButton icon="bell-outline" to="BlankScreen" size={22} color={GlobalStore.theme.colors.text}/>
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
                    color={GlobalStore.theme.colors.text}
                    style={{marginLeft: -5, marginRight: -12}}
                />
            </>}


        </Appbar.Header>
    );
});
