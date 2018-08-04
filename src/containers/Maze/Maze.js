import './Maze.styl';

import React, { Component } from 'react';
import Type from 'prop-types';
import { connect } from 'react-redux';

import MazeEntity from '../../components/MazeEntity';
import PonyIcon from '../../../images/pony.svg';
import EnemyIcon from '../../../images/enemy.svg';
import ExitIcon from '../../../images/exit.svg';

@connect(state => ({
  mazeMatrix: state.setUp.mazeMatrix,
  ponyCoords: state.setUp.ponyCoords,
  enemyCoords: state.setUp.enemyCoords,
  exitCoords: state.setUp.exitCoords,
}), null)
export default class Maze extends Component {
  static propTypes = {
    ponyCoords: Type.object,
    enemyCoords: Type.object,
    exitCoords: Type.object,
    mazeMatrix: Type.array
  }

  render() {
    const {
      ponyCoords,
      enemyCoords,
      exitCoords,
      mazeMatrix
    } = this.props;

    return (
      <div className="c-maze">
        {
          ponyCoords &&
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
            coords={enemyCoords}
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
