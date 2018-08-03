import * as setUpActionTypes from '../constants/SetUpConstants';

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
  exitCoords: null
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
    updatedFields
  } = action;

  switch (type) {
    case setUpActionTypes.SET_INITIAL_SETTINGS:
      return {
        ...state,
        gameParams: {
          selectedPony: state.ponies[0],
          width: state.mazeSizeExtremums[0],
          height: state.mazeSizeExtremums[0],
          difficulty: state.difficultyExtremums[0]
        }
      };

    case setUpActionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        gameParams: {
          ...state.gameParams,
          [property]: value
        }
      };

    case setUpActionTypes.UPDATE_MAZE:
      return {
        ...state,
        ...updatedFields
      }

    default:
      return state;
  }
}
