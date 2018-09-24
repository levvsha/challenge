import gameReducer, { getInitialState } from '../game';

describe('>>> game reducer', () => {
  let beforeState;
  let afterState;

  beforeEach(() => {
    beforeState = getInitialState();
    afterState = getInitialState();
  });

  it('+++ initial state is correct', () => {
    expect(gameReducer(undefined, {})).toMatchSnapshot();
  });

  it('+++ reducer for SWITCH_TO_SETUP_MODE', () => {
    beforeState.inTheGame = true;
    beforeState.isGameFinished = true;

    afterState.inTheGame = false;
    afterState.isGameFinished = false;

    expect(gameReducer(beforeState, { type: 'game/SWITCH_TO_SETUP_MODE' })).toEqual(afterState);
  });

  it('+++ reducer for START_REQUEST', () => {
    afterState.isLoading = true;

    expect(gameReducer(beforeState, { type: 'game/START_REQUEST' })).toEqual(afterState);
  });

  it('+++ reducer for GAME_FINISHED (the game is lost)', () => {
    afterState.isGameFinished = true;
    afterState.isWin = false;

    const action = {
      type: 'game/GAME_FINISHED',
      isWin: false
    };

    expect(gameReducer(beforeState, action)).toEqual(afterState);
  });

  it('+++ reducer for GAME_FINISHED (the game is won)', () => {
    afterState.isGameFinished = true;
    afterState.isWin = true;

    const action = {
      type: 'game/GAME_FINISHED',
      isWin: true
    };

    expect(gameReducer(beforeState, action)).toEqual(afterState);
  });

  it('+++ reducer for FINISH_REQUEST', () => {
    beforeState.isLoading = true;
    afterState.isLoading = false;

    expect(gameReducer(beforeState, { type: 'game/FINISH_REQUEST' })).toEqual(afterState);
  });

  it('+++ reducer for FINISH_REQUEST', () => {
    beforeState.isLoading = true;
    afterState.isLoading = false;

    expect(gameReducer(beforeState, { type: 'game/FINISH_REQUEST' })).toEqual(afterState);
  });

  it('+++ reducer for UPDATE_SETTINGS', () => {
    afterState.gameParams.width = 20;

    const action = {
      type: 'game/UPDATE_SETTINGS',
      value: 20,
      property: 'width'
    };

    expect(gameReducer(beforeState, action)).toEqual(afterState);
  });

  it('+++ reducer for UPDATE_MAZE', () => {
    const payload = {
      allowedDirections: {
        left: true,
        right: false,
        top: true,
        bottom: false
      },
      currentMazeId: '851573df-9a61-45bf-aefa-080a184d91f1',
      enemyCoords: { x: 5, y: 4 },
      exitCoords: { x: 8, y: 14 },
      inTheGame: true,
      mazeMatrix: [],
      ponyCoords: []
    };

    const action = {
      type: 'game/UPDATE_MAZE',
      updatedFields: payload
    };

    Object.assign(afterState, payload);

    expect(gameReducer(beforeState, action)).toEqual(afterState);
  });
});
