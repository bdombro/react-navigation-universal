import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Animated, View} from "react-native";
import {NavigationStackProp} from "react-navigation-stack/src/types";
import {GlobalState} from "../../../GlobalState";
import {Appbar, Avatar, IconButton, Link} from '../';

export type HeaderDefaultSectionProps = {
    navigation: NavigationStackProp,
    title: string,
    scrollOffset: number,
    scrollUpOffset: number,
};

export const HeaderDefaultSection = observer(function HeaderDefaultSection(
    {
        navigation,
        title,
        scrollOffset,
        scrollUpOffset,
    }: HeaderDefaultSectionProps
): React.ReactElement {


    React.useEffect(() => {
        if (GlobalState.viewportInfo.isSmall) titleOpacity.setValue(1);
        else titleOpacity.setValue(
            Math.min(Math.max(scrollOffset/80 - .5, 0), 1)
        );
    }, [scrollOffset]);


    const [titleOpacity] = useState(new Animated.Value(0));
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    return (
        <Appbar.Header
            style={{
                backgroundColor: GlobalState.theme.colors.background,
                elevation: 0,
                ...GlobalState.viewportInfo.isLarge && {height: 46}
            }}
        >
            {!navigation.isFirstRouteInParent() && <Appbar.BackAction onPress={() => navigation.goBack()}/>}
            <Appbar.Content
                title={
                    <Animated.Text style={{
                        opacity: titleOpacity
                    }}>{title}</Animated.Text>
                }
            />


            {GlobalState.viewportInfo.isLarge && <>
                <IconButton icon="magnify" to="BlankScreen" size={22} color={GlobalState.theme.colors.text}/>
                <View>
                    <IconButton icon="bell-outline" to="BlankScreen" size={22} color={GlobalState.theme.colors.text}/>
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
                    color={GlobalState.theme.colors.text}
                    style={{marginLeft: -5, marginRight: -12}}
                />
            </>}


        </Appbar.Header>
    );
});
