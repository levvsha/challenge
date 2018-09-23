import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import RangeSlider from '../';

describe('<RangeSlider />', () => {
  it('RangeSlider renders correctly', () => {
    const tree = renderer.create(
      <RangeSlider
        name="width"
        value={4}
        label="Set maze width:"
        extremums={[1, 10]}
        onChange={() => {}}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('RangeSlider onChange handler is triggered', () => {
    const updateSettingsSpy = jest.fn();

    const renderedComponent = shallow(
      <RangeSlider
        name="width"
        value={4}
        label="Set maze width:"
        extremums={[1, 10]}
        onChange={updateSettingsSpy}
      />
    );

    renderedComponent.find('InputRange').prop('onChange')();

    expect(updateSettingsSpy).toHaveBeenCalled();
  });
});

