import React, { Component } from 'react';
import Spinner from './components/Spinner';
import GameSetup from './containers/GameSetup';
import styled from 'styled-components';

const AppContainer = styled.section`
  background-color: #333;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// Add state to manage current screen

class App extends Component {

  state = {
    currentScreen: 'setup',
    game: null,
    player1: null,
    player2: null,
    winner: null
  };

  render() {
    return (
      <AppContainer className="App">
        <Spinner width="10%" />
        <GameSetup />
      </AppContainer>
    );
  }
}

export default App;
