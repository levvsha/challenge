import './Instruction.styl';

import React, { Component } from 'react';
import Type from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PonyIcon from '../../../images/pony.svg';
import EnemyIcon from '../../../images/enemy.svg';
import ExitIcon from '../../../images/exit.svg';
import Preloader from 'components/Preloader';
import * as SetUpActions from 'actions/SetUpActions';

@connect(state => ({
  allowedDirections: state.setUp.allowedDirections
}), dispatch => ({
  actions: bindActionCreators(SetUpActions, dispatch)
}))
export default class  extends Component {
  static propTypes = {
    allowedDirections: Type.object
  };

  render() {
    const {
      bottom,
      left,
      right,
      top
    } = this.props.allowedDirections;

    return (
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
        <div>
          Use arrow buttons to make the next move ("Space" to skip move)
          or click to the buttons below:
        </div>
        <div className="game-button-container">
          <button
            onClick={() => {}}
            className="button button-outline"
            disabled={!top}
          >
            ↑
          </button>
        </div>
        <div className="game-button-container">
          <button
            onClick={() => {}}
            className="button button-outline"
            disabled={!left}
          >
            ←
          </button>
          <button
            onClick={() => {}}
            className="button button-outline"
            disabled={!bottom}
          >
            ↓
          </button>
          <button
            onClick={() => {}}
            className="button button-outline"
            disabled={!right}
          >
            →
          </button>
        </div>
        <div className="game-button-container">
          <button
            onClick={() => {}}
            className="button button-outline"
          >
            Skip move (Space)
          </button>
        </div>
        <div
          style={styles.visible}
          className="preloader-wrapper"
        >
          <Preloader />
        </div>
        <div
          style={styles.visible}
          className="info-message-box"
        >
          Wait for the enemy to move
        </div>
        <button
          className="button button-outline float-right"
          onClick={this.props.actions.switchToSetUpMode}
        >
          Set up new game
        </button>
      </div>
    );
  }
}

const styles = {
  hidden: {
    visibility: 'hidden'
  },
  visible: {
    visibility: 'visible'
  }
};
