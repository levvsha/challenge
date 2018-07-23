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
      <div className="maze-app">
        <SetUp />
        <Maze />
      </div>
    );
  }
}
