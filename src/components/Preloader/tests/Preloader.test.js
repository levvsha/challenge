import React from 'react';
import { shallow } from 'enzyme';

import Preloader from '../Preloader';

describe('<Preloader />', () => {
  it('should render an <div> tag', () => {
    const renderedComponent = shallow(<Preloader />);
    expect(renderedComponent.type()).toEqual('div'); // eslint-disable-line
  });
});
