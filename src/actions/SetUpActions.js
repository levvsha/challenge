import * as setUpActionTypes from '../constants/SetUpConstants';

export function setInitialSettings() {
  return {
    type: setUpActionTypes.SET_INITIAL_SETTINGS
  }
}

export function updateSettings(value, property) {
  return {
    type: setUpActionTypes.UPDATE_SETTINGS,
    value,
    property
  }
}
