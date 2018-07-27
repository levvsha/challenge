import * as setUpActionTypes from '../constants/SetUpConstants';
import apiCall from 'utils/apiCall';

export function setInitialSettings() {
  return {
    type: setUpActionTypes.SET_INITIAL_SETTINGS
  }
}

export function updateSettings(value, property) {
  return {
    type: setUpActionTypes.UPDATE_SETTINGS,
    value,
    property
  }
}

export function createMaze(data) {
  return dispatch => {
    apiCall({
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
      console.log('response ==>', response);
      const { data } = response;

      const mazeMatrix = chunkArray(getCells(data.data).slice(), data.size[0]);

      const getCoords = (position, rowSize) => ({
        x: position % rowSize,
        y: Math.floor(position / rowSize)
      });

      const ponyCoords = getCoords(data.pony[0], data.size[0]);
      const enemyCoords = getCoords(data.domokun[0], data.size[0]);
      const exitCoords = getCoords(data['end-point'][0], data.size[0]);

      dispatch({
        type: setUpActionTypes.UPDATE_MAZE,
        updatedFields: {
          mazeMatrix,
          ponyCoords,
          enemyCoords,
          exitCoords
        }
      })
    });
  }
}

function chunkArray(array, itemsInChunk) {
  const result = [];

  while(array.length) {
    result.push(array.splice(0, itemsInChunk))

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
