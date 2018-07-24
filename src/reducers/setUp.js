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
  }
};

export default function setUp(state = initialState, action) {
  const {
    type,
    value,
    property
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

    default:
      return state;
  }
}
