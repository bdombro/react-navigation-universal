import * as React from "react";
import {shallow} from 'enzyme';
import {TestProvidersContainer} from "../../containers/TestProviders.container";
import {FooterSection} from "./";


describe('FooterModule', () => {

    it('should be hidden at mobile width', async () => {
        // TODO: Get shallow working. Has issue with paper.
        // const wrapper = shallow(<FooterSection/>, {wrappingComponent: TestProvidersContainer});
        // expect(wrapper).toMatchSnapshot();

        const wrapper = shallow(<TestProvidersContainer><FooterSection/></TestProvidersContainer>);
        console.dir(wrapper.html());
        expect(wrapper.html()).toMatchSnapshot();


    });
});
