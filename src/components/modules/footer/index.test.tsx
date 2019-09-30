import * as React from "react";
import {shallow} from 'enzyme';
import {TestProvidersContainer} from "../../containers/TestProviders.container";
import {FooterSection} from "./";


describe('FooterModule', () => {

    it('should be hidden at mobile width', async () => {
        const wrapper = shallow(<TestProvidersContainer><FooterSection/></TestProvidersContainer>);
        // console.dir(wrapper.html());
        expect(wrapper.html()).toMatchSnapshot();

    });
});
