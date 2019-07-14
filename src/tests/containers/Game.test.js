import React from "react";
import Game from "../../containers/Game";
import History from "../../containers/History";
import moxios from 'moxios';
import { shallow, mount, render } from "enzyme";

function wrapperSetPropsClosure(wrapperReference) {
    return function(game, winner) {
        wrapperReference.setProps({ game });
    }
}

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
    },
    updateGame: jest.fn()
}

describe("Game", () => {

  it("renders without crashing", () => {
    mount(<Game {...initialProps} />);
  });

  it("matches snapshot", () => {
    const wrapper = mount(<Game {...initialProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("does 1 play", async (done) => {
    moxios.install();
    
    const wrapper = mount(<Game {...initialProps} />);
    const updateWrapper = wrapperSetPropsClosure(wrapper);
    wrapper.setProps({ updateGame: updateWrapper });
    moxios.stubRequest(`http://localhost:3000/games/add_play/${initialProps.game._id}`, {
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
                        winner: 'player2'
                    }
                ]
            }
        }
    });
    wrapper.find('button').simulate('click');
    wrapper.find('button').simulate('click');
    await(new Promise((resolve) => setTimeout(() => resolve(), 0)));
    wrapper.update();
    const spans = wrapper.find(History).find('li').find('span').getElements();
    expect(spans[spans.length - 1].props.children).toBe(initialProps.player2.username);
    done();
  });

});
