import './Game.styl';

import React, { Component } from 'react';
import Type from 'prop-types';
import SetUp from './containers/SetUp';
import Maze from './containers/Maze';

export default class Game extends Component {
  static propTypes = {
    children: Type.array
  }

  render() {
    return (
      <div className="game-app-root">
        <h1 className="app-title">
          Trustpilot Pony Challenge
        </h1>
        <div className="columns">
          <div className="column">
            <SetUp />
          </div>
          <div className="column">
            <Maze />
          </div>
        </div>
      </div>
    );
  }
}
