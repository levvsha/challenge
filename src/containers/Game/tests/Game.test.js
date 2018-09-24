import React from 'react';
import { shallow } from 'enzyme';
import Control from 'containers/Control';
import Maze from 'containers/Maze';
import SetUp from 'containers/SetUp';
import IntroText from 'components/IntroText';

import { Game, mapStateToProps } from '../';

describe('<Game />', () => {
  it('mapStateToProps', () => {
    const mockState = {
      game: {
        inTheGame: false,
        foo: 'bar'
      },
      foo: 'bar'
    };

    const expectedState = {
      inTheGame: false
    };

    expect(mapStateToProps(mockState)).toEqual(expectedState);
  });

  it('<Game /> renders correct child component when inTheGame = true', () => {
    const renderedComponent = shallow(
      <Game inTheGame={true} />
    );

    expect(renderedComponent.find(Control).length).toEqual(1);
    expect(renderedComponent.find(Maze).length).toEqual(1);
    expect(renderedComponent.find(SetUp).length).toEqual(0);
    expect(renderedComponent.find(IntroText).length).toEqual(0);
  });

  it('<Game /> renders correct child component when inTheGame = false', () => {
    const renderedComponent = shallow(
      <Game inTheGame={false} />
    );

    expect(renderedComponent.find(SetUp).length).toEqual(1);
    expect(renderedComponent.find(IntroText).length).toEqual(1);
    expect(renderedComponent.find(Control).length).toEqual(0);
    expect(renderedComponent.find(Maze).length).toEqual(0);
  });
});
