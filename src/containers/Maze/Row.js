import React from 'react';
import Type from 'prop-types';

import Cell from './Cell';

const Row = ({ row }) => (
  <div className="maze-row">
    {row.map((cellBordersConfig, cellIndex) => (
      <Cell
        key={cellIndex}
        borders={cellBordersConfig}
      />
    ))}
  </div>
);

Row.propTypes = {
  row: Type.arrayOf(Type.object).isRequired
}

export default Row;
