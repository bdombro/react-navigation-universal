import * as React from "react";
import {createNavigator, SwitchRouter} from "react-navigation";
import {createAppContainer} from "react-navigation";
import {Provider as PaperProvider} from "../modules";
import {ThemeConfig} from "../../config/Theme.config";
import {GlobalLayout} from "./Global.layout";
import {StoreContainer} from "./Store.container";

export interface TestProvidersContainerProps {pathnameBase?: string, pathnameParam?: string, children}

export const TestProvidersContainer = ({pathnameBase = '/', pathnameParam = '', children}: TestProvidersContainerProps) => {
    // @ts-ignore
    global.window.location.pathname = pathnameBase + pathnameParam ? '/' + pathnameParam : '';

    const RouterApp = createAppContainer(
        createNavigator(
            GlobalLayout,
            SwitchRouter({
                IndexScreen: {screen: () => <>{children}</>, path: pathnameParam ? `:${pathnameParam}` : ''},
            }, {}),
            {},
        )
    );

    return (
        <StoreContainer>
            <PaperProvider theme={ThemeConfig.light}>
                <RouterApp/>
            </PaperProvider>
        </StoreContainer>
    )
};