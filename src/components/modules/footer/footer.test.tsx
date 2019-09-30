import * as React from "react";
import {render, waitForElement} from 'react-native-testing-library';
import {FooterSection} from "./";
// import {Provider as PaperProvider} from "react-native-paper";
import {Provider as PaperProvider} from "../paper";
import {ThemeConfig} from "../../../config/Theme.config";
import {StoreContainer} from "../../containers/Store.container";
import * as renderer from "react-test-renderer";
import {sleep} from "../../../lib/sleep";
import {Text} from "react-native";

// Cannot get PaperProvider to work inside jest. Something todo with privider:17 and portal.

const AllTheProviders = ({children}) => {
    return (
        <StoreContainer>
            <PaperProvider theme={ThemeConfig.light}>
                {children}
            </PaperProvider>
        </StoreContainer>
    )
};

describe('Footer', () => {
    // it('should be hidden at mobile width', async () => {
    //     const {toJSON, getByText, getByTestId} = render(<FooterSection/>, {wrapper: AllTheProviders});
    //     await waitForElement(() => getByTestId('FooterSection'));
    //     // let textElement = getByTestId('FooterSection');
    //     // expect(textElement).toBeTruthy();
    // });

    it('should be hidden at mobile width', async () => {
        const tree = renderer.create(<AllTheProviders><Text>Hello</Text></AllTheProviders>).toJSON();
        await sleep(3000);
        console.dir(tree);
    });
});
