import React from "react";
import History from "../../containers/History";
import { shallow, mount, render } from "enzyme";

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
        plays: [
            {
                player1Play: 1,
                player2Play: 2,
                winner: 'player2'
            },
            {
                player1Play: 1,
                player2Play: 2,
                winner: 'player1'
            },
            {
                player1Play: 1,
                player2Play: 2,
                winner: 'player2'
            },
            {
                player1Play: 1,
                player2Play: 1,
                winner: null
            },
            {
                player1Play: 1,
                player2Play: 2,
                winner: 'player2'
            }
        ]
    }
}

describe("History", () => {

  it("renders without crashing", () => {
    mount(<History {...initialProps} />);
  });

  it("matches snapshot", () => {
    const wrapper = mount(<History {...initialProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correct number of rows", () => {
    const wrapper = mount(<History {...initialProps} />);
    expect(wrapper.find(History).find('li').length).toBe(initialProps.game.plays.length + 1); // Plus 1 because of header row
  });

  it("renders last and first row correct names", () => {
    const wrapper = mount(<History {...initialProps} />);
    const spans = wrapper.find(History).find('li').find('span').getElements();
    expect(spans[3].props.children).toBe(initialProps[initialProps.game.plays[0].winner].userName); // First row
    expect(spans[spans.length - 1].props.children).toBe(initialProps[initialProps.game.plays[initialProps.game.plays.length - 1].winner].userName); // First row
  });

});
