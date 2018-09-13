import React from 'react';
import Type from 'prop-types';

const Cell = ({ borders }) => (
  <div className="maze-cell">
    {
      borders.top && <div className="maze-top-border" />
    }
    {
      borders.left && <div className="maze-left-border" />
    }
  </div>
);

Cell.propTypes = {
  borders: Type.shape({
    left: Type.bool,
    top: Type.bool
  }).isRequired
}

export default Cell;
