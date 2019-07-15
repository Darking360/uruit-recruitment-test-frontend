import React from "react";
import Statistics from "../../containers/Statistics";
import moxios from "moxios";
import { shallow, mount, render } from "enzyme";

const moxiosResponse = [
  {
    _id: 1,
    username: "Miguel",
    avatar: "some",
    games: [
      {
        _id: 1,
        player1: 1,
        player2: 2,
        winner: "player1"
      },
      {
        _id: 1,
        player1: 1,
        player2: 2,
        winner: "player1"
      },
      {
        _id: 1,
        player1: 1,
        player2: 2,
        winner: "player1"
      },
      {
        _id: 1,
        player1: 1,
        player2: 2,
        winner: "player1"
      }
    ]
  },
  {
    _id: 2,
    username: "Juan",
    avatar: "some",
    games: [
      {
        _id: 1,
        player1: 1,
        player2: 2,
        winner: "player1"
      },
      {
        _id: 1,
        player1: 1,
        player2: 2,
        winner: "player1"
      },
      {
        _id: 1,
        player1: 1,
        player2: 2,
        winner: "player1"
      },
      {
        _id: 1,
        player1: 1,
        player2: 2,
        winner: "player1"
      }
    ]
  }
];

describe("History", () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest("http://localhost:3000/users", {
      status: 200,
      response: [...moxiosResponse]
    });
  });

  it("renders without crashing", async done => {
    mount(<Statistics goBackTo={jest.fn()} lastScreen="setup" />);
    await new Promise(resolve => setTimeout(() => resolve(), 0));
    done();
  });

  it("matches snapshot", async done => {
    const wrapper = mount(<Statistics goBackTo={jest.fn()} lastScreen="setup" />);
    await new Promise(resolve => setTimeout(() => resolve(), 0));
    expect(wrapper).toMatchSnapshot();
    done();
  });

  it("renders correct number of rows", async done => {
    const wrapper = mount(<Statistics goBackTo={jest.fn()} lastScreen="setup" />);
    await new Promise(resolve => setTimeout(() => resolve(), 0));
    wrapper.update();
    expect(wrapper.find(Statistics).find("li").length).toBe(
      moxiosResponse.length + 1
    ); // Plus 1 because of header row
    done();
  });

  it("renders last and first row correct names", async done => {
    const wrapper = mount(<Statistics goBackTo={jest.fn()} lastScreen="setup" />);
    await new Promise(resolve => setTimeout(() => resolve(), 0));
    wrapper.update();
    const spans = wrapper
      .find("li")
      .find("span")
      .getElements();
    expect(spans[3].props.children).toBe(moxiosResponse[0].username); // First row
    expect(spans[5].props.children).toBe(moxiosResponse[0].games.length); // Number of wins
    done();
  });
});
