/* Preloader from http://tobiasahlin.com/spinkit/ by @tobiasahlin */

import './Preloader.styl';

import React from 'react';

const Preloader = () => (
  <div className="c-preloader">
    <div className="spinner">
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </div>
  </div>
);

// Preloader.propTypes = {};

export default Preloader;
