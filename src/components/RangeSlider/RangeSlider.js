import 'react-input-range/lib/css/index.css';
import './RangeSlider.styl';

import React, { Component } from 'react';
import Type from 'prop-types';
import InputRange from 'react-input-range';

export default class RangeSlider extends Component {
  static propTypes = {
    extremums: Type.array,
    label: Type.string,
    name: Type.string,
    onChange: Type.func,
    value: Type.number
  };

  handleChange = (value) => {
    this.props.onChange(value, this.props.name);
  }

  render() {
    const {
      extremums,
      label,
      value
    } = this.props;

    return (
      <div className="c-range-slider">
        <div className="label">
          {label}
        </div>
        <div className="range-slider">
          <InputRange
            maxValue={extremums[1]}
            minValue={extremums[0]}
            onChange={this.handleChange}
            value={value}
          />
        </div>
      </div>
    );
  }
}
