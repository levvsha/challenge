import React from 'react';
import renderer from 'react-test-renderer';

import MazeEntity from '../';

describe('<MazeEntity />', () => {
  it('MazeEntity renders correctly', () => {
    const MockIcon = () => (<div />);

    const tree = renderer.create(
      <MazeEntity
        key="pony"
        Icon={MockIcon}
        coords={{ x: 1, y: 2 }}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
