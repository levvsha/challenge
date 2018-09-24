import './IntroText.styl';

import React from 'react';

const IntroText = () => (
  <div className="c-intro-text">
    <div className="intro-text-image-wrapper">
      <img
        src="images/mlcc.jpg"
        alt="challenge logo"
        className="intro-text-image"
      />
    </div>
    My solution to the My Little Code Challenge by
    Trustpilot. <a
      target="blank"
      href="https://ponychallenge.trustpilot.com/index.html"
    >
      See details
    </a>.
    <div className="intro-text-image-wrapper">
      <img
        src="images/trustpilot-logo.png"
        alt="trustpilot logo"
        className="intro-text-image"
      />
    </div>
    You can also check my:
    <ul className="my-links-list">
      <li>
        <a
          href="https://stackoverflow.com/users/5806646/mikhail-shabrikov"
          target="_blank"
        >
          Stack Overflow profile
        </a>
      </li>
      <li>
        <a
          href="https://medium.com/@mshabrikov"
          target="_blank"
        >
          articles on Medium
        </a>
      </li>
      <li>
        <a
          href="https://github.com/levvsha"
          target="_blank"
        >
          Github profile
        </a>
      </li>
      <li>
        <a
          href="https://levvsha.github.io/about-me/"
          target="_blank"
        >
          homepage
        </a>
      </li>
    </ul>
  </div>
);

IntroText.displayName = 'IntroText';

// IntroText.propTypes = {};

export default IntroText;
