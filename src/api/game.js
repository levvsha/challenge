import apiCall from 'utils/apiCall';

export function createMaze(data) {
  return apiCall({
    method: 'POST',
    path: '/pony-challenge/maze',
    data
  });
}

export function getMazeState(mazeId) {
  return apiCall({
    method: 'GET',
    path: `/pony-challenge/maze/${ mazeId }`,
  });
}

export function makeStep(mazeId, direction) {
  return apiCall({
    method: 'POST',
    path: `/pony-challenge/maze/${ mazeId }`,
    data: {
      direction
    }
  });
}
