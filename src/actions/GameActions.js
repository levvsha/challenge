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
  return async (dispatch, getState) => {
    const { ponyCoords, mazeMatrix, currentMazeId } = getState().game;
    const newPonyCoords = getNewPonyCoords(ponyCoords, direction);
    const newAllowedDirections = getAllowedDirections(mazeMatrix, newPonyCoords);

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

    try {
      const response = await gameApi.makeStep(currentMazeId, direction);

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
    } catch (error) {
      console.error('makeStep action: ', error);
    }
  }
}

export function createMaze(data) {
  return async dispatch => {
    dispatch({
      type: gameActionTypes.START_REQUEST
    });

    try {
      const response = await gameApi.createMaze(data);

      dispatch(getMazeStateFirstTime(response.data.maze_id));
    } catch (error) {
      console.error('createMaze action', error);
    }
  }
}

export function getMazeState() {
  return async (dispatch, getState) => {
    const { currentMazeId, ponyCoords, exitCoords } = getState().game;

    try {
      const response = await gameApi.getMazeState(currentMazeId);

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
    } catch (error) {
      console.error('getMazeState action', error);
    }
  }
}

export function getMazeStateFirstTime(mazeId) {
  return async dispatch => {
    try {
      const { data } = await gameApi.getMazeState(mazeId);
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
    } catch (error) {
      console.eror('getMazeStateFirstTime action', error);
    }
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
