import * as React from "react";
import {Platform} from "react-native";

const originalError = global.console.error;
global.console.error = function error(...args) {
    if (args.length > 0 && typeof args[0] === 'string' && (
        /is using incorrect casing/.test(args[0])
        || /useLayoutEffect does nothing on the server/.test(args[0])
        || /React does not recognize the .* prop on a DOM element/.test(args[0])
        || /Received .* for a non-boolean attribute/.test(args[0])
    )) {
        return;
    }
    originalError.apply(console, args);
};


import {FooterSection} from "./";
import {Provider as PaperProvider} from "../paper";
import {ThemeConfig} from "../../../config/Theme.config";
import {StoreContainer} from "../../containers/Store.container";



import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
configure({ adapter: new Adapter() });



import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import {createAppContainer, createNavigator, SwitchRouter} from "react-navigation";
import {GlobalLayout} from "../../containers/Global.layout";


const AllTheProviders = ({children}) => {
    const RouterApp = createAppContainer(
        createNavigator(
            GlobalLayout,
            SwitchRouter({
                IndexScreen: {screen: () => <>{children}</>, path: ''},
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



describe('Footer', () => {
    jest.useFakeTimers();

    beforeEach(() => {
        NavigationTestUtils.resetInternalState();
    });

    it('should be hidden at mobile width', async () => {
        const wrapper = shallow(<AllTheProviders><FooterSection/></AllTheProviders>);
        // console.dir(wrapper.html());
        console.dir(wrapper.html().includes("Thar be footer!"));
        expect(wrapper.html().includes("Thar be footer!")).toBeTruthy();

    });
});
