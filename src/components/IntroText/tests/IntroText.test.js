import React from 'react';
import renderer from 'react-test-renderer';

import IntroText from '../';

describe('<IntroText />', () => {
  it('IntroText renders correctly', () => {
    const tree = renderer.create(<IntroText />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
