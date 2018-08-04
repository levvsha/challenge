import * as gameActionTypes from '../constants/GameConstants';

const initialState = {
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
Object.assign(initialState, {
  gameParams: {
    selectedPony: initialState.ponies[0],
    width: initialState.mazeSizeExtremums[0],
    height: initialState.mazeSizeExtremums[0],
    difficulty: initialState.difficultyExtremums[0]
  }
});

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
