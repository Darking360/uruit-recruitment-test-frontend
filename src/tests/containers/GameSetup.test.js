import React from "react";
import GameSetup from "../../containers/GameSetup";
import { GameFieldSet } from '../../components/Form';
import moxios from 'moxios';
import { shallow, mount, render } from "enzyme";

const typeEvent1 = {target: {name: 'player1', value: "Miguel"}};
const typeEvent2 = {target: {name: 'player2', value: "Juan"}};

// Mock for setGame

describe("Game Setup", () => {
  it("renders without crashing", () => {
    mount(<GameSetup />);
  });

  it("matches snapshot", () => {
    const wrapper = mount(<GameSetup />);
    expect(wrapper).toMatchSnapshot();
  });

  describe("changes values", () => {
    const newGameMock = jest.fn();
    let wrapper = mount(<GameSetup setGame={newGameMock} />);
    beforeEach(() => {
        moxios.install()
        wrapper.find('input[name="player1"]').simulate('change', typeEvent1)
        wrapper.find('input[name="player2"]').simulate('change', typeEvent2)
    });

    it("writes players names into props and input values", () => {
        expect(wrapper.find('input[name="player1"]').props().value).toBe(typeEvent1.target.value);
        expect(wrapper.find('input[name="player2"]').props().value).toBe(typeEvent2.target.value);
        const [ player1Input, player2Input ] = wrapper.find(GameFieldSet);
        expect(player1Input.props.value).toBe(typeEvent1.target.value);
        expect(player2Input.props.value).toBe(typeEvent2.target.value);
      });

    it("clicks the play button and sets the new game", async (done) => {
        moxios.stubRequest('http://localhost:3000/users', {
            status: 200,
            response: {
              data: {
                _id: Math.floor(Math.random() * 21) + 1,
                username: 'Miguel',
                avatar: 'some'
              }
            }
        });
        moxios.stubRequest('http://localhost:3000/games', {
          status: 200,
          response: {
            data: {
              _id: Math.floor(Math.random() * 21) + 1,
              player1: 1,
              player2: 2,
              plays: []
            }
          }
      });
      wrapper.find('button').simulate('click');
      wrapper.update();
      // Waiting event loop to resolve and catch moxios requests correctly
      await(new Promise((resolve) => setTimeout(() => resolve(), 0)));
      // Check setGame have been called with correct params
      expect(newGameMock).toHaveBeenCalled();
      expect(newGameMock).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
