import * as actionTypes from '../constants/MazeConstants';

const initialState = {
  message: 'before test action'
};

export default function mazeReducer(state = initialState, action) {
  const {
    message,
    type
  } = action;

  switch (type) {
    case actionTypes.INITIAL_CONSTANT:
      return {
        ...state,
        message
      };

    default:
      return state;
  }
}
