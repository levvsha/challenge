import './Instruction.styl';

import React from 'react';
import Type from 'prop-types';

import PonyIcon from '../../../images/pony.svg';
import EnemyIcon from '../../../images/enemy.svg';
import ExitIcon from '../../../images/exit.svg';
import Preloader from 'components/Preloader';

const Instruction = (props) => (
  <div className="c-instruction">
    <h2 className="g-title">
      How to play
    </h2>
    <div className="legend">
      <PonyIcon className="instruction-icon" />
      - your character
    </div>
    <div className="legend">
      <EnemyIcon className="instruction-icon" />
      - your enemy, don't fall for him
    </div>
    <div className="legend">
      <ExitIcon className="instruction-icon" />
      - exit of the maze
    </div>
    <div className="game-button-container">
      <button
        onClick={() => {}}
        className="button button-outline "
      >
        ↑
      </button>
    </div>
    <div className="game-button-container">
      <button
        onClick={() => {}}
        className="button button-outline "
      >
        ←
      </button>
      <button
        onClick={() => {}}
        className="button button-outline "
      >
        ↓
      </button>
      <button
        onClick={() => {}}
        className="button button-outline "
      >
        →
      </button>
    </div>
    <div className="game-button-container">
      <button
        onClick={() => {}}
        className="button button-outline "
      >
        Space
      </button>
    </div>
    <div>
      Use arrow buttons to make the next move ("Space" to skip move)
      or click to the buttons above
    </div>
    <Preloader />
    <button
      onClick={props.hideInstruction}
      className="button button-outline float-right"
    >
      Set up new game
    </button>
  </div>
);

Instruction.propTypes = {
  hideInstruction: Type.func
};

export default Instruction;
