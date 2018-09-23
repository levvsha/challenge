import * as gameActionTypes from '../constants/GameConstants';

export function getInitialState() {
  const state = {
    ponies: [
      'Twilight Sparkle',
      'Rainbow Dash',
      'Pinkie Pie',
      'Rarity',
      'Applejack',
      'Fluttershy',
      'Spike'
    ],
    mazeSizeExtremums: [15, 25],
    difficultyExtremums: [0, 10],
    gameParams: {
      selectedPony: null,
      width: null,
      height: null,
      difficulty: null
    },
    mazeMatrix: [],
    ponyCoords: null,
    enemyCoords: null,
    exitCoords: null,
    inTheGame: false,
    isLoading: false,
    currentMazeId: null,
    isGameFinished: false,
    isWin: false,
    allowedDirections: {
      left: false,
      right: false,
      top: false,
      bottom: false
    }
  };

  /* We set default game params depends on the ponies list and extremums. */
  Object.assign(state, {
    gameParams: {
      selectedPony: state.ponies[0],
      width: state.mazeSizeExtremums[0],
      height: state.mazeSizeExtremums[0],
      difficulty: state.difficultyExtremums[0]
    }
  });

  return state
}

const initialState = getInitialState();

export default function setUp(state = initialState, action) {
  const {
    type,
    value,
    property,
    updatedFields,
    isWin
  } = action;

  switch (type) {
    case gameActionTypes.SWITCH_TO_SETUP_MODE:
      return {
        ...state,
        inTheGame: false,
        isGameFinished: false
      };

    case gameActionTypes.START_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case gameActionTypes.GAME_FINISHED:
      return {
        ...state,
        isWin,
        isGameFinished: true
      };

    case gameActionTypes.FINISH_REQUEST:
      return {
        ...state,
        isLoading: false
      };

    case gameActionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        gameParams: {
          ...state.gameParams,
          [property]: value
        }
      };

    case gameActionTypes.UPDATE_MAZE:
      return {
        ...state,
        ...updatedFields
      }

    default:
      return state;
  }
}
