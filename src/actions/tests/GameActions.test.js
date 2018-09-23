import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import createMazeResponseMock from 'api/__mocks__/createMazeResponseMock';
import getMazeResponseMock from 'api/__mocks__/getMazeResponseMock';
import makeStepResponseMock from 'api/__mocks__/makeStepResponseMock';
import * as gameAPI from 'api/game';
import { getInitialState } from 'reducers/game';

import {
  updateSettings,
  switchToSetUpMode,
  makeStep,
  createMaze,
  getMazeState,
  getMazeStateFirstTime,
  getCoords,
  getNewPonyCoords,
  getAllowedDirections,
  checkIsGameFinished,
  chunkArray,
  getCells
} from '../GameActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* Mock API */
gameAPI.createMaze = () => new Promise((resolve) => {
  resolve({ data: JSON.parse(createMazeResponseMock) });
});

gameAPI.getMazeState = () => new Promise((resolve) => {
  resolve({ data: JSON.parse(getMazeResponseMock) });
});

gameAPI.makeStep = () => new Promise((resolve) => {
  resolve({ data: JSON.parse(makeStepResponseMock) });
});

describe('>>> GameActions', () => {
  it('+++ updateSettings action', () => {
    const action = {
      type: 'game/UPDATE_SETTINGS',
      property: 'difficulty',
      value: 3
    };

    expect(updateSettings(3, 'difficulty')).toEqual(action);
  });

  it('+++ switchToSetUpMode action', () => {
    expect(switchToSetUpMode()).toEqual({ type: 'game/SWITCH_TO_SETUP_MODE'});
  });

  it('+++ createMaze action', () => {
    const store = mockStore(getInitialState());

    store.dispatch(createMaze()).then(() => {
      console.log('store ==>', store.getActions());
    });
  });
});

describe('>>> GameActions helpers', () => {
  it('+++ getCoords helper', () => {
    expect(getCoords(40, 12)).toEqual({ x: 4, y: 3 });
  });

  describe('> getNewPonyCoords helper', () => {
    it('+++ getNewPonyCoords (direction = north)', () => {
      expect(getNewPonyCoords({ x: 2, y: 3 }, 'north')).toEqual({ x: 2, y: 2 });
    });

    it('+++ getNewPonyCoords (direction = east)', () => {
      expect(getNewPonyCoords({ x: 2, y: 3 }, 'east')).toEqual({ x: 3, y: 3 });
    });

    it('+++ getNewPonyCoords (direction = south)', () => {
      expect(getNewPonyCoords({ x: 2, y: 3 }, 'south')).toEqual({ x: 2, y: 4 });
    });

    it('+++ getNewPonyCoords (direction = west)', () => {
      expect(getNewPonyCoords({ x: 2, y: 3 }, 'west')).toEqual({ x: 1, y: 3 });
    });
  });

  it('+++ getAllowedDirections helper', () => {
    const mazeMatrix = [
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

    const coords = {
      x: 1,
      y: 1
    };

    const expectedAllowedDirections = {
      left: true,
      right: false,
      top: true,
      bottom: false
    };

    expect(getAllowedDirections(mazeMatrix, coords)).toEqual(expectedAllowedDirections);
  });

  describe('> checkIsGameFinished helper', () => {
    it('+++ checkIsGameFinished helper (finish and loss)', () => {
      const coords = {
        ponyCoords: {
          x: 1,
          y: 2
        },
        enemyCoords: {
          x: 1,
          y: 2
        },
        exitCoords: {
          x: 3,
          y: 3
        }
      };

      expect(checkIsGameFinished(coords)).toEqual({ isFinish: true, isWin: false });
    });

    it('+++ checkIsGameFinished helper (finish and win)', () => {
      const coords = {
        ponyCoords: {
          x: 1,
          y: 2
        },
        enemyCoords: {
          x: 3,
          y: 2
        },
        exitCoords: {
          x: 1,
          y: 2
        }
      };

      expect(checkIsGameFinished(coords)).toEqual({ isFinish: true, isWin: true });
    });

    it('+++ checkIsGameFinished helper not finish', () => {
      const coords = {
        ponyCoords: {
          x: 1,
          y: 2
        },
        enemyCoords: {
          x: 1,
          y: 3
        },
        exitCoords: {
          x: 3,
          y: 3
        }
      };

      expect(checkIsGameFinished(coords)).toEqual({ isFinish: false, isWin: false });
    });
  });

  it('+++ chunkArray helper', () => {
    expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('+++ getCells helper', () => {
    const initialCells = [
      [
        'west',
        'north',
      ],
      [
        'west'
      ],
      [],
      [
        'north'
      ]
    ];

    const expectedCells = [
      {
        left: true,
        top: true
      },
      {
        left: true
      },
      {},
      {
        top: true
      }
    ];

    expect(getCells(initialCells)).toEqual(expectedCells);
  });
});

