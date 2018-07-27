import './Game.styl';

import React from 'react';
import SetUp from './containers/SetUp';
import Maze from './containers/Maze';

const Game = () => (
  <div className="game-app-root">
    <h1 className="app-title">
      Trustpilot Pony Challenge
    </h1>
    <div className="columns">
      <div className="column set-up">
        <SetUp />
      </div>
      <div className="column maze">
        <Maze />
      </div>
    </div>
  </div>
);

export default Game;