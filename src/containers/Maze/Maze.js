import React, { Component } from 'react';
import Type from 'prop-types';

import PonyIcon from '../../../images/pony.svg';
import EnemyIcon from '../../../images/enemy.svg';

export default class Maze extends Component {
  static propTypes = {
    children: Type.array
  }

  render() {
    return (
      <div>
        <PonyIcon width="40" />
        <EnemyIcon width="40" />
      </div>
    );
  }
}
