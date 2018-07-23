import * as actionTypes from '../constants/MazeConstants';

export function testAction() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: actionTypes.INITIAL_CONSTANT,
        message: 'after test action'
      });
    }, 3500);
  };
}
