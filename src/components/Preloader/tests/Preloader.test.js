import React from 'react';
import renderer from 'react-test-renderer';

import Preloader from '../';

describe('<Preloader />', () => {
  it('Preloader renders correctly', () => {
    const tree = renderer.create(<Preloader />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
