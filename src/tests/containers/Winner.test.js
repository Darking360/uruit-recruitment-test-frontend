import React from "react";
import Winner from "../../containers/Winner";
import { shallow, mount, render } from "enzyme";

const initialProps = {
    resetGame: jest.fn(),
    player1: {
        _id: 1,
        username: 'Miguel',
        avatar: 'some'
    },
    player2: {
        _id: 2,
        username: 'Juan',
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
        ],
        winner: 'player2'
    }
}

describe("Winner", () => {

  it("renders without crashing", () => {
    mount(<Winner {...initialProps} />);
  });

  it("matches snapshot", () => {
    const wrapper = mount(<Winner {...initialProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("render correct winner information", () => {
    const wrapper = mount(<Winner {...initialProps} />);
    expect(wrapper.find('img').prop('src')).toMatch(new RegExp(`${initialProps.player2.avatar}`)); // Correct avatar
    expect(wrapper.find('h3').text()).toMatch(new RegExp(`${initialProps.player2.username}`)); //Correct username
  });

  it("calls reset game to return to main screen", () => {
    const goBackMock = jest.fn();
    const wrapper = mount(<Winner {...initialProps} resetGame={goBackMock} />);
    wrapper.find('button').simulate('click');
    expect(goBackMock).toHaveBeenCalled();
    expect(goBackMock).toHaveBeenCalledTimes(1);
  });

});