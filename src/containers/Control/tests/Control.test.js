import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { Control, mapStateToProps, mapDispatchToProps } from '../';

describe('<Control />', () => {
  it('mapStateToProps', () => {
    const mockState = {
      game: {
        allowedDirections: {},
        isLoading: true,
        isGameFinished: false,
        foo: 'bar'
      },
      foo: 'bar'
    };

    const expectedState = {
      allowedDirections: {},
      isLoading: true,
      isGameFinished: false
    };

    expect(mapStateToProps(mockState)).toEqual(expectedState);
  });

  it('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).actions.switchToSetUpMode();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'game/SWITCH_TO_SETUP_MODE' });
  });

  it('<Control /> renders correctly', () => {
    const directions = {
      top: false,
      right: true,
      left: true,
      bottom: false
    };

    const actions = {
      makeStep: jest.fn(),
      switchToSetUpMode: jest.fn()
    };

    const tree = renderer.create(
      <Control
        actions={actions}
        allowedDirections={directions}
        isGameFinished={false}
        isLoading={false}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('<Control /> interaction and lifecicle', () => {
    let directions = {};
    let actions = {};
    let component = null;

    beforeEach(() => {
      directions = {
        top: false,
        right: true,
        left: true,
        bottom: false
      };

      actions = {
        makeStep: jest.fn(),
        switchToSetUpMode: jest.fn()
      };

      component = shallow(
        <Control
          actions={actions}
          allowedDirections={directions}
          isGameFinished={false}
          isLoading={false}
        />
      );
    });

    afterEach(() => {
      jest.resetAllMocks();
      component.unmount();
    });

    it('<Control /> keydown (direction - left - allowed)', () => {
      const event = new KeyboardEvent('keydown', { keyCode: 37 });
      window.dispatchEvent(event);

      expect(actions.makeStep).toHaveBeenCalled();
      expect(actions.makeStep).toHaveBeenCalledWith('west');
    });

    it('<Control /> keydown (direction - right - allowed)', () => {
      const event = new KeyboardEvent('keydown', { keyCode: 39 });
      window.dispatchEvent(event);

      expect(actions.makeStep).toHaveBeenCalled();
      expect(actions.makeStep).toHaveBeenCalledWith('east');
    });

    it('<Control /> keydown (direction - top - not allowed)', () => {
      const event = new KeyboardEvent('keydown', { keyCode: 38 });
      window.dispatchEvent(event);

      expect(actions.makeStep).not.toHaveBeenCalled();
    });

    it('<Control /> keydown (stay)', () => {
      const event = new KeyboardEvent('keydown', { keyCode: 32 });
      window.dispatchEvent(event);

      expect(actions.makeStep).toHaveBeenCalled();
      expect(actions.makeStep).toHaveBeenCalledWith('stay');
    });
  });

  describe('<Control /> interaction and lifecicle', () => {
    let directions = {};
    let actions = {};
    let component = null;

    beforeEach(() => {
      directions = {
        top: true,
        right: false,
        left: false,
        bottom: true
      };

      actions = {
        makeStep: jest.fn(),
        switchToSetUpMode: jest.fn()
      };

      component = shallow(
        <Control
          actions={actions}
          allowedDirections={directions}
          isGameFinished={false}
          isLoading={false}
        />
      );
    });

    afterEach(() => {
      jest.resetAllMocks();
      component.unmount();
    });

    it('<Control /> keydown (direction - top - allowed)', () => {
      const event = new KeyboardEvent('keydown', { keyCode: 38 });
      window.dispatchEvent(event);

      expect(actions.makeStep).toHaveBeenCalled();
      expect(actions.makeStep).toHaveBeenCalledWith('north');
    });

    it('<Control /> keydown (direction - bottom - allowed)', () => {
      const event = new KeyboardEvent('keydown', { keyCode: 40 });
      window.dispatchEvent(event);

      expect(actions.makeStep).toHaveBeenCalled();
      expect(actions.makeStep).toHaveBeenCalledWith('south');
    });

    it('<Control /> keydown (direction - left - not allowed)', () => {
      const event = new KeyboardEvent('keydown', { keyCode: 37 });
      window.dispatchEvent(event);

      expect(actions.makeStep).not.toHaveBeenCalled();
    });

    it('<Control /> keydown (direction - right - not allowed)', () => {
      const event = new KeyboardEvent('keydown', { keyCode: 39 });
      window.dispatchEvent(event);

      expect(actions.makeStep).not.toHaveBeenCalled();
    });
  });

  describe('<Control /> interaction and lifecicle', () => {
    let directions = {};
    let actions = {};
    let component = null;

    beforeEach(() => {
      directions = {
        top: true,
        right: false,
        left: false,
        bottom: true
      };

      actions = {
        makeStep: jest.fn(),
        switchToSetUpMode: jest.fn()
      };

      component = shallow(
        <Control
          actions={actions}
          allowedDirections={directions}
          isGameFinished={false}
          isLoading={true}
        />
      );
    });

    afterEach(() => {
      jest.resetAllMocks();
      component.unmount();
    });

    it('<Control /> keydown (isLoading - direction is prevented)', () => {
      const event = new KeyboardEvent('keydown', { keyCode: 40 });
      window.dispatchEvent(event);

      expect(actions.makeStep).not.toHaveBeenCalled();
    });
  });
});