import './Maze.styl';

import React, { Component } from 'react';
import Type from 'prop-types';
import { connect } from 'react-redux';

import MazeEntity from '../../components/MazeEntity';
import PonyIcon from '../../../images/pony.svg';
import EnemyIcon from '../../../images/enemy.svg';
import ExitIcon from '../../../images/exit.svg';

@connect(state => ({
  mazeMatrix: state.game.mazeMatrix,
  ponyCoords: state.game.ponyCoords,
  enemyCoords: state.game.enemyCoords,
  exitCoords: state.game.exitCoords,
  isGameFinished: state.game.isGameFinished,
  isWin: state.game.isWin
}), null)
export default class Maze extends Component {
  static propTypes = {
    ponyCoords: Type.object,
    enemyCoords: Type.object,
    exitCoords: Type.object,
    mazeMatrix: Type.array,
    isGameFinished: Type.bool,
    isWin: Type.bool
  }

  render() {
    const {
      ponyCoords,
      enemyCoords,
      exitCoords,
      mazeMatrix,
      isGameFinished,
      isWin
    } = this.props;

    return (
      <div className="c-maze">
        {
          isGameFinished &&
            <div className="maze-overlay">
              {
                isWin
                  ? 'Congrats! You won!'
                  : 'You lost. Try again'
              }
            </div>
        }
        {
          !isGameFinished && ponyCoords &&
          <MazeEntity
            key="pony"
            Icon={PonyIcon}
            coords={ponyCoords}
          />
        }
        {
          enemyCoords &&
          <MazeEntity
            key="enemy"
            Icon={EnemyIcon}
            coords={isGameFinished && !isWin ? ponyCoords : enemyCoords}
          />
        }
        {
          exitCoords &&
          <MazeEntity
            key="exit"
            Icon={ExitIcon}
            coords={exitCoords}
          />
        }
        {
          mazeMatrix && mazeMatrix.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="maze-row"
            >
              {row.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  className="maze-cell"
                >
                  {
                    cell.top && <div className="maze-top-border" />
                  }
                  {
                    cell.left && <div className="maze-left-border" />
                  }
                </div>
              ))}
            </div>
          ))
        }
      </div>
    );
  }
}
