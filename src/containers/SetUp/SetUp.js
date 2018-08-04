import './SetUp.styl';

import React, { Component } from 'react';
import Type from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _isNumber from 'lodash/isNumber';

import * as SetUpActions from 'actions/SetUpActions';
import RangeSlider from 'components/RangeSlider';
import Preloader from 'components/Preloader';

@connect(state => ({
  difficultyExtremums: state.setUp.difficultyExtremums,
  gameParams: state.setUp.gameParams,
  mazeSizeExtremums: state.setUp.mazeSizeExtremums,
  ponies: state.setUp.ponies
}), dispatch => ({
  actions: bindActionCreators(SetUpActions, dispatch)
}))
export default class SetUp extends Component {
  static propTypes = {
    difficultyExtremums: Type.array,
    gameParams: Type.object,
    mazeSizeExtremums: Type.array,
    ponies: Type.array
  }

  state = {
    isLoading: false,
  }

  createMaze = () => {
    const { gameParams } = this.props;

    this.setState({
      isLoading: true
    });

    this.props.actions.createMaze({
      'maze-width': gameParams.width,
      'maze-height': gameParams.height,
      'maze-player-name': gameParams.selectedPony,
      difficulty: gameParams.difficulty
    }).then(() => {
      this.setState({
        isLoading: false
      });
    }).catch(() => {
      this.setState({
        isLoading: false
      });
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
      ponies
    } = this.props;

    const { updateSettings } = this.props.actions;
    const { isLoading } = this.state;

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
          disabled={this.state.isLoading}
        >
          Start game
        </button>
      </div>
    );
  }
}
