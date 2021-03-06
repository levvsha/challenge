import './SetUp.styl';

import React, { Component } from 'react';
import Type from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _isNumber from 'lodash/isNumber';

import * as GameActions from 'actions/GameActions.js';
import RangeSlider from 'components/RangeSlider';
import Preloader from 'components/Preloader';

export class SetUp extends Component {
  static propTypes = {
    difficultyExtremums: Type.arrayOf(Type.number).isRequired,
    gameParams: Type.shape({
      difficulty: Type.number.isRequired,
      height: Type.number.isRequired,
      selectedPony: Type.string.isRequired,
      width: Type.number.isRequired
    }),
    mazeSizeExtremums: Type.arrayOf(Type.number).isRequired,
    ponies: Type.arrayOf(Type.string).isRequired,
    actions: Type.objectOf(Type.func).isRequired,
    isLoading: Type.bool.isRequired
  }

  createMaze = () => {
    const { gameParams } = this.props;

    this.props.actions.createMaze({
      'maze-width': gameParams.width,
      'maze-height': gameParams.height,
      'maze-player-name': gameParams.selectedPony,
      difficulty: gameParams.difficulty
    });
  }

  handleSelectChange = (event) => {
    this.props.actions.updateSettings(event.target.value, 'selectedPony');
  }

  render() {
    const {
      difficultyExtremums,
      gameParams,
      mazeSizeExtremums,
      ponies,
      isLoading
    } = this.props;

    const { updateSettings } = this.props.actions;

    return (
      <div className="c-set-up">
        <h2 className="g-title">
          Set up the game
        </h2>
        <label htmlFor="characters">
          Select a character:
        </label>
        {
          gameParams.selectedPony &&
          <select
            id="characters"
            value={gameParams.selectedPony}
            onChange={this.handleSelectChange}
          >
            {
              ponies.map(pony => (
                <option
                  key={pony}
                  value={pony}
                >
                  {pony}
                </option>
              ))
            }
          </select>
        }
        {
          _isNumber(gameParams.width) &&
          <RangeSlider
            key="width"
            name="width"
            value={gameParams.width}
            label="Set maze width:"
            extremums={mazeSizeExtremums}
            onChange={updateSettings}
          />
        }
        {
          _isNumber(gameParams.height) &&
          <RangeSlider
            key="height"
            name="height"
            value={gameParams.height}
            label="Set maze height:"
            extremums={mazeSizeExtremums}
            onChange={updateSettings}
          />
        }
        {
          _isNumber(gameParams.difficulty) &&
          <RangeSlider
            key="difficulty"
            name="difficulty"
            value={gameParams.difficulty}
            label="Set difficulty:"
            extremums={difficultyExtremums}
            onChange={updateSettings}
          />
        }
        {
          isLoading && (
            <div className="preloader-container">
              <Preloader />
            </div>
          )
        }
        <button
          onClick={this.createMaze}
          className="button button-outline float-right"
          disabled={isLoading}
        >
          Start game
        </button>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  difficultyExtremums: state.game.difficultyExtremums,
  gameParams: state.game.gameParams,
  mazeSizeExtremums: state.game.mazeSizeExtremums,
  ponies: state.game.ponies,
  isLoading: state.game.isLoading
});

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(GameActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SetUp);
