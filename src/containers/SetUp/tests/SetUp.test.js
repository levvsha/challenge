import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { SetUp, mapStateToProps, mapDispatchToProps } from '../';

describe('<SetUp />', () => {
  it('mapStateToProps', () => {
    const mockState = {
      game: {
        difficultyExtremums: [0, 10],
        gameParams: {
          selectedPony: 'Rainbow Dash',
          width: 20,
          height: 21,
          difficulty: 3
        },
        mazeSizeExtremums: [15, 25],
        ponies: [
          'Twilight Sparkle',
          'Rainbow Dash',
          'Pinkie Pie',
          'Rarity',
          'Applejack',
          'Fluttershy',
          'Spike'
        ],
        isLoading: false,
        foo: 'bar'
      },
      foo: 'bar'
    };

    const expectedState = {
      difficultyExtremums: [0, 10],
      gameParams: {
        selectedPony: 'Rainbow Dash',
        width: 20,
        height: 21,
        difficulty: 3
      },
      mazeSizeExtremums: [15, 25],
      ponies: [
        'Twilight Sparkle',
        'Rainbow Dash',
        'Pinkie Pie',
        'Rarity',
        'Applejack',
        'Fluttershy',
        'Spike'
      ],
      isLoading: false
    };

    expect(mapStateToProps(mockState)).toEqual(expectedState);
  });

  it('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).actions.switchToSetUpMode();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'game/SWITCH_TO_SETUP_MODE' });
  });

  it('<SetUp /> renders correctly', () => {
    const actions = {
      createMaze: jest.fn(),
      updateSettings: jest.fn()
    };

    const tree = renderer.create(
      <SetUp
        actions={actions}
        difficultyExtremums={[0, 10]}
        gameParams={{
          selectedPony: 'Rainbow Dash',
          width: 20,
          height: 21,
          difficulty: 3
        }}
        mazeSizeExtremums={[15, 25]}
        ponies={[
          'Twilight Sparkle',
          'Rainbow Dash',
          'Pinkie Pie',
          'Rarity',
          'Applejack',
          'Fluttershy',
          'Spike'
        ]}
        isLoading={false}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('<SetUp /> interaction', () => {
    let actions = {};
    let component = null;

    beforeEach(() => {
      actions = {
        createMaze: jest.fn(),
        updateSettings: jest.fn()
      };

      component = shallow(
        <SetUp
          actions={actions}
          difficultyExtremums={[0, 10]}
          gameParams={{
            selectedPony: 'Rainbow Dash',
            width: 20,
            height: 21,
            difficulty: 3
          }}
          mazeSizeExtremums={[15, 25]}
          ponies={[
            'Twilight Sparkle',
            'Rainbow Dash',
            'Pinkie Pie',
            'Rarity',
            'Applejack',
            'Fluttershy',
            'Spike'
          ]}
          isLoading={false}
        />
      );
    });

    afterEach(() => {
      jest.resetAllMocks();
      component.unmount();
    });

    it('<SetUp /> call createMaze action', () => {
      component.find('button').simulate('click');

      expect(actions.createMaze).toHaveBeenCalled();
      expect(actions.createMaze).toHaveBeenCalledWith({
        'maze-width': 20,
        'maze-height': 21,
        'maze-player-name': 'Rainbow Dash',
        difficulty: 3
      });
    });

    it('<SetUp /> call updateSettings action', () => {
      component.find('select').simulate("change", { target: { value: 'Rainbow Dash' } });

      expect(actions.updateSettings).toHaveBeenCalled();
      expect(actions.updateSettings).toHaveBeenCalledWith('Rainbow Dash', 'selectedPony');
    });
  });
});
