import './Control.styl';

import React, { Component } from 'react';
import Type from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PonyIcon from '../../../images/pony.svg';
import EnemyIcon from '../../../images/enemy.svg';
import ExitIcon from '../../../images/exit.svg';
import Preloader from 'components/Preloader';
import * as GameActions from 'actions/GameActions.js';

export class Control extends Component {
  static propTypes = {
    allowedDirections: Type.shape({
      top: Type.bool.isRequired,
      right: Type.bool.isRequired,
      bottom: Type.bool.isRequired,
      left: Type.bool.isRequired
    }).isRequired,
    actions: Type.objectOf(Type.func).isRequired,
    isLoading: Type.bool.isRequired,
    isGameFinished: Type.bool.isRequired
  };

  constructor() {
    super();

    this.makeStepTop = this.makeStep.bind(this, 'north');
    this.makeStepRight = this.makeStep.bind(this, 'east');
    this.makeStepBottom = this.makeStep.bind(this, 'south');
    this.makeStepLeft = this.makeStep.bind(this, 'west');
    this.makeStepStay = this.makeStep.bind(this, 'stay');
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    const { isLoading, isGameFinished, allowedDirections } = this.props;

    if (event.keyCode >= 37 && event.keyCode <= 40) {
      event.preventDefault();
    }

    if (isGameFinished || isLoading) {
      return false;
    }

    switch (event.keyCode) {
      case 38: // top
        if (allowedDirections.top) {
          this.makeStepTop();
        }

        break;

      case 39: // right
        if (allowedDirections.right) {
          this.makeStepRight();
        }

        break;

      case 40: // bottom
        if (allowedDirections.bottom) {
          this.makeStepBottom();
        }

        break;

      case 37: // left
        if (allowedDirections.left) {
          this.makeStepLeft();
        }
        break;

      case 32:
        this.makeStepStay();
        break;
    }
  }

  makeStep(direction) {
    this.props.actions.makeStep(direction);
  }

  render() {
    const { isGameFinished, isLoading } = this.props;

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
          Use arrow buttons to make the next move ("Space bar" to skip move)
          or click to the buttons below:
        </div>
        <div className="game-button-container">
          <button
            onClick={this.makeStepTop}
            className="button button-outline"
            disabled={isGameFinished || isLoading || !top}
          >
            ↑
          </button>
        </div>
        <div className="game-button-container">
          <button
            onClick={this.makeStepLeft}
            className="button button-outline"
            disabled={isGameFinished || isLoading || !left}
          >
            ←
          </button>
          <button
            onClick={this.makeStepBottom}
            className="button button-outline"
            disabled={isGameFinished || isLoading || !bottom}
          >
            ↓
          </button>
          <button
            onClick={this.makeStepRight}
            className="button button-outline"
            disabled={isGameFinished || isLoading || !right}
          >
            →
          </button>
        </div>
        <div className="game-button-container">
          <button
            onClick={this.makeStepStay}
            className="button button-outline"
            disabled={isGameFinished || isLoading}
          >
            Skip move (Space bar)
          </button>
        </div>
        <div
          style={isLoading ? styles.visible : styles.hidden}
          className="preloader-wrapper"
        >
          <Preloader />
        </div>
        <div
          style={isLoading ? styles.visible : styles.hidden}
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

export const mapStateToProps = state => ({
  allowedDirections: state.game.allowedDirections,
  isLoading: state.game.isLoading,
  isGameFinished: state.game.isGameFinished
});

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(GameActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Control);
