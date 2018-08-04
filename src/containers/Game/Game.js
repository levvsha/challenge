import './Game.styl';

import React, { Component } from 'react';
import Type from 'prop-types';
import {connect} from 'react-redux';

import SetUp from 'containers/SetUp';
import Maze from 'containers/Maze';
import Instruction from 'containers/Instruction';
import IntroText from 'components/IntroText';

@connect(state => ({
  inTheGame: state.setUp.inTheGame
}), null)
export default class Game extends Component {
  static propTypes = {
    inTheGame: Type.bool
  };

  render() {
    const { inTheGame } = this.props;

    return (
      <div className="c-game-app-root">
        <h1 className="app-title">
          Trustpilot Pony Challenge
        </h1>
        <div className="columns">
          <div className="column set-up">
            {
              inTheGame
                ? <Instruction />
                : <SetUp />
            }
          </div>
          <div className="column maze">
            {
              inTheGame
                ? <Maze />
                : <IntroText />
            }
          </div>
        </div>
      </div>
    );
  }
}
