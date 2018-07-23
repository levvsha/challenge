import './App.styl';

import React from 'react';
import Type from 'prop-types';

import PonyIcon from '../../../images/pony.svg';
import EnemyIcon from '../../../images/enemy.svg';

export default class App extends React.Component {
  static propTypes = {
    children: Type.array
  }

  render() {
    return (
      <div className="app">
        <h2>app will be here</h2>
        <PonyIcon width="40" />
        <EnemyIcon width="40" />
      </div>
    );
  }
}
