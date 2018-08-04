import * as setUpActionTypes from '../constants/SetUpConstants';
import apiCall from 'utils/apiCall';

export function updateSettings(value, property) {
  return {
    type: setUpActionTypes.UPDATE_SETTINGS,
    value,
    property
  }
}

export function switchToSetUpMode() {
  return {
    type: setUpActionTypes.SWITCH_TO_SETUP_MODE
  }
}

export function createMaze(data) {
  return dispatch => {
    return apiCall({
      method: 'POST',
      path: '/pony-challenge/maze',
      data
    }).then(response => {
      dispatch(getMazeState(response.data.maze_id))
    });
  }
}

export function getMazeState(mazeId) {
  return dispatch => {
    apiCall({
      method: 'GET',
      path: `/pony-challenge/maze/${ mazeId }`,
    }).then(response => {
      const { data } = response;
      const mazeMatrix = chunkArray(getCells(data.data), data.size[0]);

      const ponyCoords = getCoords(data.pony[0], data.size[0]);
      const enemyCoords = getCoords(data.domokun[0], data.size[0]);
      const exitCoords = getCoords(data['end-point'][0], data.size[0]);

      const allowedDirections = {
        left: !mazeMatrix[ponyCoords.y][ponyCoords.x].left,
        right: !mazeMatrix[ponyCoords.y][ponyCoords.x + 1] || !mazeMatrix[ponyCoords.y][ponyCoords.x + 1].left,
        top: !mazeMatrix[ponyCoords.y][ponyCoords.x].top,
        bottom: !mazeMatrix[ponyCoords.y + 1] || !mazeMatrix[ponyCoords.y + 1][ponyCoords.x].top,
      };

      dispatch({
        type: setUpActionTypes.UPDATE_MAZE,
        updatedFields: {
          mazeMatrix,
          ponyCoords,
          enemyCoords,
          exitCoords,
          allowedDirections,
          inTheGame: true
        }
      })
    });
  }
}

/* helper functions */

const getCoords = (position, rowSize) => ({
  x: position % rowSize,
  y: Math.floor(position / rowSize)
});

function chunkArray(array, itemsInChunk) {
  const arrayCopy = array.slice();
  const result = [];

  while(arrayCopy.length) {
    result.push(arrayCopy.splice(0, itemsInChunk))
  }

  return result;
}

const getCells = (data) => data.map(cell => {
  const cellObject = {};

  if (cell.length) {
    if (cell.length === 2) {
      cellObject.left = true;
      cellObject.top = true;
    } else {
      if (cell[0] === 'west') {
        cellObject.left = true;
      } else {
        cellObject.top = true;
      }
    }
  }

  return cellObject
});
