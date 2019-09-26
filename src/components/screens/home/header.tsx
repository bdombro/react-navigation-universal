import * as React from "react";
import {Animated} from "react-native";
import {NavigationScreenProp} from "react-navigation";
import {useSelector} from "react-redux";
import {StoreState} from "../../../reducers";
import {Appbar, HeaderDefaultSection, IconButton, Title} from '../../modules';

export type HeaderHomeSectionProps = {
    navigation: NavigationScreenProp<any>,
    title: string,
    scrollOffset: number,
    scrollUpOffset: number,
}

export function HeaderHomeSection(
    {
        navigation,
        title,
        scrollOffset,
        scrollUpOffset,
    }: HeaderHomeSectionProps
) {
    const theme = useSelector((state: StoreState) => state.theme);
    const viewportInfo = useSelector((state: StoreState) => state.viewportInfo);
    const [translateY] =React.useState(new Animated.Value(0));
    React.useEffect(() => {
        translateY.setValue(Math.max(
            // When scrolling down. Max with zero b/c scrollOffset can be negative when dragging
            -Math.max(scrollOffset, 0),
            // When scrolling back up, scroll the header back into view
            -54 + Math.min(scrollUpOffset, 54)
        ));
    }, [scrollOffset]);

    if (viewportInfo.isLarge)
        return <HeaderDefaultSection {...{navigation, title, scrollOffset, scrollUpOffset}}/>;

    return (
        <Animated.View
            style={{
                zIndex: 999,
                height: 0,
                // opacity: translateY.interpolate({
                //     inputRange: [-30, 0],
                //     outputRange: [0, 1]
                // }),
                transform: [{translateY,}],
            }}
        >
            <Appbar.Header
                style={{
                    backgroundColor: theme.colors.background,
                    elevation: 0,
                    ...viewportInfo.isLarge && {height: 46}
                }}
            >
                <Animated.View
                    style={{
                        opacity: translateY.interpolate({
                            inputRange: [-30, 0],
                            outputRange: [0, 1]
                        }),
                    }}
                >
                    <Title>{title}</Title>
                </Animated.View>

                <Appbar.Content title=""/>

                <Animated.View
                    style={{
                        opacity: translateY.interpolate({
                            inputRange: [-30, 0],
                            outputRange: [0, 1]
                        }),
                    }}
                >
                    <IconButton icon="magnify" to="Blank" size={22} color={theme.colors.text}/>
                </Animated.View>
            </Appbar.Header>
        </Animated.View>
    );
}
