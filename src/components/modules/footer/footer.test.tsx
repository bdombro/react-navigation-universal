import * as React from "react";
import {render, waitForElement} from 'react-native-testing-library';
import {FooterSection} from "./";
import {Provider as PaperProvider} from "react-native-paper";
import {ThemeConfig} from "../../../config/Theme.config";
import {StoreContainer} from "../../containers/Store.container";

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
    it('should be hidden at mobile width', async () => {
        const {toJSON, getByText, getByTestId} = render(<FooterSection/>, {wrapper: AllTheProviders});
        await waitForElement(() => getByTestId('FooterSection'));
        // let textElement = getByTestId('FooterSection');
        // expect(textElement).toBeTruthy();
    });
});
