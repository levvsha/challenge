import React from 'react';
import renderer from 'react-test-renderer';

import { Maze, mapStateToProps } from '../';

const mazeMatrixMock = [
  [
    {
      left: true,
      top: true,
    },
    {
      top: true,
    },
    {
      left: true,
      top: true,
    },
  ],
  [
    {
      left: true,
      top: true,
    },
    {},
    {
      left: true,
      top: true,
    },
  ],
  [
    {
      left: true,
    },
    {
      top: true,
    },
    {
      left: true,
    },
  ],
];

describe('<Maze />', () => {
  it('mapStateToProps', () => {
    const mockState = {
      game: {
        mazeMatrix: [],
        ponyCoords: {},
        enemyCoords: {},
        exitCoords: {},
        isGameFinished: false,
        isWin: false,
        foo: 'bar'
      },
      foo: 'bar'
    };

    const expectedState = {
      mazeMatrix: [],
      ponyCoords: {},
      enemyCoords: {},
      exitCoords: {},
      isGameFinished: false,
      isWin: false,
    };

    expect(mapStateToProps(mockState)).toEqual(expectedState);
  });

  it('<Maze /> renders correctly', () => {

    const tree = renderer.create(
      <Maze
        enemyCoords={{ x: 1, y: 1 }}
        exitCoords={{ x: 1, y: 2 }}
        ponyCoords={{ x: 2, y: 2 }}
        isGameFinished={false}
        isWin={false}
        mazeMatrix={mazeMatrixMock}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
