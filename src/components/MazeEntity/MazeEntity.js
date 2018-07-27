import './MazeEntity.styl';

import React from 'react';
import Type from 'prop-types';

import config from 'config';

const getStylesByCoords = coords => ({
  left: coords.x * config.cellSize,
  top: coords.y * config.cellSize
});

const MazeEntity = ({ Icon, coords }) => (
  <Icon
    className="c-icon"
    style={getStylesByCoords(coords)}
  />
);

MazeEntity.propTypes = {
  Icon: Type.func,
  coords: Type.object
}

export default MazeEntity;