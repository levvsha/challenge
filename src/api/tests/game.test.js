jest.mock('utils/apiCall');
import apiCall from 'utils/apiCall';
import {
  createMaze,
  getMazeState,
  makeStep
} from '../game';

describe('game api endpoints', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('createMaze endpoint', () => {
    createMaze({ foo: 'bar' });

    expect(apiCall).toHaveBeenCalled();
    expect(apiCall).toHaveBeenCalledWith({
      method: 'POST',
      path: '/pony-challenge/maze',
      data: { foo: 'bar' }
    });
  });

  it('createMaze endpoint', () => {
    getMazeState('maze-id');

    expect(apiCall).toHaveBeenCalled();
    expect(apiCall).toHaveBeenCalledWith({
      method: 'GET',
      path: '/pony-challenge/maze/maze-id',
    });
  });

  it('createMaze endpoint', () => {
    makeStep('maze-id', 'west');

    expect(apiCall).toHaveBeenCalled();
    expect(apiCall).toHaveBeenCalledWith({
      method: 'POST',
      path: '/pony-challenge/maze/maze-id',
      data: {
        direction: 'west'
      }
    });
  });
});