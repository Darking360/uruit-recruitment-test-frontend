import React from "react";
import { mount, shallow, render } from "enzyme";
import App from "../App";
import { typeEvent1, typeEvent2 } from './containers/GameSetup.test';
import Game from '../containers/Game';
import moxios from "moxios";

const initialProps = {
  player1: {
    _id: 1,
    usernames: 'Miguel',
    avatar: 'some'
  },
  player2: {
      _id: 2,
      usernames: 'Juan',
      avatar: 'some'
  },
  game: {
      _id: 1,
      player1: 1,
      player2: 2,
      plays: []
  }
}

describe("App", () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest(
      `http://localhost:3000/games/add_play/${initialProps.game._id}`,
      {
        status: 200,
        response: {
          game: {
            _id: initialProps.game._id,
            player1: initialProps.player1._id,
            player2: initialProps.player1._id,
            plays: [
              {
                player1Play: 1,
                player2Play: 2,
                winner: "player2"
              }
            ]
          }
        }
      }
    );
    moxios.stubRequest("http://localhost:3000/users", {
      status: 200,
      response: {
        data: {
          _id: 1,
          username: "Miguel",
          avatar: "some"
        }
      }
    });
    moxios.stubRequest("http://localhost:3000/games", {
      status: 200,
      response: {
        data: {
          _id: initialProps.game._id,
          player1: 1,
          player2: 2,
          plays: []
        }
      }
    });
  });

  it("renders without crashing", () => {
    mount(<App />);
  });

  it("matches snapshot", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it("completes a whole game 1 round winner immediately", async (done) => {
    const wrapper = mount(<App />);
    // Type and setup Game
    wrapper.find('input[name="player1"]').simulate('change', typeEvent1)
    wrapper.find('input[name="player2"]').simulate('change', typeEvent2)
    expect(wrapper.find('input[name="player1"]').props().value).toBe(typeEvent1.target.value);
    expect(wrapper.find('input[name="player2"]').props().value).toBe(typeEvent2.target.value);
    // Click to setup and go to Game
    wrapper.find('button#setup').simulate('click');
    wrapper.update()
    await(new Promise((resolve) => setTimeout(() => resolve(), 0)));
    // Waiting event loop to resolve and catch moxios requests correctly
    // Game set, now play 2 times to trigger and set winner
    console.log(wrapper.find('button').length);
    wrapper.find('button#play').simulate('click');
    wrapper.find('button#play').simulate('click');
    wrapper.update();
    await(new Promise((resolve) => setTimeout(() => resolve(), 0)));
    // Now there should be a winner
    expect(wrapper.find('img').prop('src')).toMatch(new RegExp(`${initialProps.player2.avatar}`)); // Correct avatar
    expect(wrapper.find('h3').text()).toMatch(new RegExp(`${initialProps.player2.username}`)); // Correct username
    done();
  });
});
