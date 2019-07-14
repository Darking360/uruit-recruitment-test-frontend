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

  it("renders complete app with render", () => {
    render(<App />);
  });
});
