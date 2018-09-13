import './Maze.styl';

import React, { Component } from 'react';
import Type from 'prop-types';
import { connect } from 'react-redux';

import MazeEntity from 'components/MazeEntity';
import Row from './Row';
import PonyIcon from '../../../images/pony.svg';
import EnemyIcon from '../../../images/enemy.svg';
import ExitIcon from '../../../images/exit.svg';

export class Maze extends Component {
  static propTypes = {
    ponyCoords: Type.shape({
      x: Type.number.isRequired,
      y: Type.number.isRequired
    }).isRequired,
    enemyCoords: Type.shape({
      x: Type.number.isRequired,
      y: Type.number.isRequired
    }).isRequired,
    exitCoords: Type.shape({
      x: Type.number.isRequired,
      y: Type.number.isRequired
    }).isRequired,
    mazeMatrix: Type.arrayOf(
      Type.arrayOf(Type.shape({
        left: Type.bool,
        top: Type.bool
      }))
    ).isRequired,
    isGameFinished: Type.bool.isRequired,
    isWin: Type.bool.isRequired
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
            <Row
              key={rowIndex}
              row={row}
            />
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mazeMatrix: state.game.mazeMatrix,
  ponyCoords: state.game.ponyCoords,
  enemyCoords: state.game.enemyCoords,
  exitCoords: state.game.exitCoords,
  isGameFinished: state.game.isGameFinished,
  isWin: state.game.isWin
});

export default connect(mapStateToProps)(Maze);
