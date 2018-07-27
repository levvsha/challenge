import './SetUp.styl';
import 'react-input-range/lib/css/index.css';

import React, { Component } from 'react';
import Type from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _isNumber from 'lodash/isNumber';

import * as SetUpActions from 'actions/SetUpActions';
import RangeSlider from 'components/RangeSlider';

@connect(state => ({
  setUp: state.setUp
}), dispatch => ({
  actions: bindActionCreators(SetUpActions, dispatch)
}))
export default class SetUp extends Component {
  static propTypes = {
    children: Type.array,
    setUp: Type.object
  }

  constructor(props) {
    super(props);

    props.actions.setInitialSettings();
  }

  createMaze = () => {
    const { gameParams } = this.props.setUp;

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
      ponies
    } = this.props.setUp;

    const { updateSettings } = this.props.actions;

    return (
      <div className="c-set-up">
        <h2 className="set-up-title">
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
        <button
          onClick={this.createMaze}
          className="button button-outline float-right"
        >
          Start game
        </button>
      </div>
    );
  }
}
