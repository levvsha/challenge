import * as gameActionTypes from 'constants/GameConstants';
import * as gameApi from 'api/game';
import config from 'config';

export function updateSettings(value, property) {
  return {
    type: gameActionTypes.UPDATE_SETTINGS,
    value,
    property
  }
}

export function switchToSetUpMode() {
  return {
    type: gameActionTypes.SWITCH_TO_SETUP_MODE
  }
}

export function makeStep(direction) {
  return (dispatch, getState) => {
    const { ponyCoords, mazeMatrix, currentMazeId } = getState().game;
    const newPonyCoords = getNewPonyCoords(ponyCoords, direction);
    console.log('newPonyCoords ==>', newPonyCoords)
    const newAllowedDirections = getAllowedDirections(mazeMatrix, newPonyCoords);
console.log('newAllowedDirections ==>', newAllowedDirections)
    dispatch({
      type: gameActionTypes.START_REQUEST
    });

    dispatch({
      type: gameActionTypes.UPDATE_MAZE,
      updatedFields: {
        ponyCoords: newPonyCoords,
        allowedDirections: newAllowedDirections
      }
    });

    return gameApi.makeStep(currentMazeId, direction).then((response) => {
      if (config.successStepMessages.indexOf(response.data['state-result']) >= 0) {
        dispatch(getMazeState());
      } else {
        dispatch({
          type: gameActionTypes.FINISH_REQUEST
        });

        if (response.data['state-result'] === config.looseMessage) {
          dispatch({
            type: gameActionTypes.GAME_FINISHED,
            isWin: false
          });
        }

        if (response.data['state-result'] === config.winMessage) {
          dispatch({
            type: gameActionTypes.GAME_FINISHED,
            isWin: true
          });
        }
      }
    });
  }
}

export function createMaze(data) {
  return dispatch => {
    dispatch({
      type: gameActionTypes.START_REQUEST
    });

    return gameApi.createMaze(data).then(response => {
      return dispatch(getMazeStateFirstTime(response.data.maze_id))
    });
  }
}

export function getMazeState() {
  return (dispatch, getState) => {
    const { currentMazeId, ponyCoords, exitCoords } = getState().game;

    return gameApi.getMazeState(currentMazeId).then(response => {
      const { data } = response;
      const enemyCoords = getCoords(data.domokun[0], data.size[0]);
      const isGameFinished = checkIsGameFinished({ enemyCoords, ponyCoords, exitCoords});

      if (isGameFinished.isFinish) {
        dispatch({
          type: gameActionTypes.GAME_FINISHED,
          isWin: isGameFinished.isWin
        });
      }

      dispatch({
        type: gameActionTypes.FINISH_REQUEST
      });

      dispatch({
        type: gameActionTypes.UPDATE_MAZE,
        updatedFields: {
          enemyCoords,
        }
      });
    });
  }
}

export function getMazeStateFirstTime(mazeId) {
  return dispatch => {
    gameApi.getMazeState(mazeId).then(response => {
      const { data } = response;
      const mazeMatrix = chunkArray(getCells(data.data), data.size[0]);

      const ponyCoords = getCoords(data.pony[0], data.size[0]);
      const enemyCoords = getCoords(data.domokun[0], data.size[0]);
      const exitCoords = getCoords(data['end-point'][0], data.size[0]);

      const allowedDirections = getAllowedDirections(mazeMatrix, ponyCoords);

      dispatch({
        type: gameActionTypes.UPDATE_MAZE,
        updatedFields: {
          mazeMatrix,
          ponyCoords,
          enemyCoords,
          exitCoords,
          allowedDirections,
          inTheGame: true,
          currentMazeId: mazeId
        }
      });

      dispatch({
        type: gameActionTypes.FINISH_REQUEST
      });
    });
  }
}

/* helper functions */

const getCoords = (position, rowSize) => ({
  x: position % rowSize,
  y: Math.floor(position / rowSize)
});

const getNewPonyCoords = (currentCoords, direction) => {
  const newCoords = Object.assign({}, currentCoords);

  switch (direction) {
    case 'north':
      newCoords.y = currentCoords.y - 1;
      break;

    case 'east':
      newCoords.x = currentCoords.x + 1;
      break;

    case 'south':
      newCoords.y = currentCoords.y + 1;
      break;

    case 'west':
      newCoords.x = currentCoords.x - 1;
      break;
  }

  return newCoords;
};

const getAllowedDirections = (mazeMatrix, ponyCoords) => ({
  left: !mazeMatrix[ponyCoords.y][ponyCoords.x].left,
  right: !!mazeMatrix[ponyCoords.y][ponyCoords.x + 1] && !mazeMatrix[ponyCoords.y][ponyCoords.x + 1].left,
  top: !mazeMatrix[ponyCoords.y][ponyCoords.x].top,
  bottom: !!mazeMatrix[ponyCoords.y + 1] && !mazeMatrix[ponyCoords.y + 1][ponyCoords.x].top,
});

const checkIsGameFinished = (coords) => {
  let isWin = false;
  let isFinish = false;

  if (coords.ponyCoords.x === coords.enemyCoords.x && coords.ponyCoords.y === coords.enemyCoords.y) {
    isFinish = true;
  }

  if (coords.ponyCoords.x === coords.exitCoords.x && coords.ponyCoords.y === coords.exitCoords.y) {
    isFinish = true;
    isWin = true;
  }

  return {
    isFinish,
    isWin
  }
};

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
