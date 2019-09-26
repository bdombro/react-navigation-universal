import 'react-native';
import * as React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import * as renderer from 'react-test-renderer';

import App from "./App";

describe('App', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it(`renders the loading screen`, () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
