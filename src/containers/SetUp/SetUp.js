import React, { Component } from 'react';
import Type from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SetUpActions from 'actions/SetUpActions';

@connect(state => ({
  setUp: state.setUp
}), dispatch => ({
  dispatch,
  actions: bindActionCreators(SetUpActions, dispatch)
}))
export default class SetUp extends Component {
  static propTypes = {
    children: Type.array
  }

  constructor(props) {
    super(props);

    props.actions.setInitialSettings();
  }

  render() {
    console.log('this.props.setUp ==>', this.props.setUp);
    return (
      <div>
        <h2>Set up the game</h2>
      </div>
    );
  }
}
