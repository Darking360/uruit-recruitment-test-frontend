import React, { Component } from 'react';
import Spinner from './components/Spinner';
import GameSetup from './containers/GameSetup';
import Game from './containers/Game';
import styled from 'styled-components';

const AppContainer = styled.section`
  background: #fdc830; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #fdc830, #f37335); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #fdc830, #f37335); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  color: white;
`;

const AppOverlay = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.78);
`;

// Add state to manage current screen

class App extends Component {

  state = {
    currentScreen: 'game',
    game: null,
    player1: null,
    player2: null,
    winner: null
  };

  getActiveScreen = () => {
    const { currentScreen } = this.state;
    switch(currentScreen) {
      case 'setup':
        return <GameSetup setGame={this.setGame} />;
      case 'game':
        return <Game {...this.state} />
      default:
        return <GameSetup />;
    }
  }

  setGame = (player1, player2, game) => {
    this.setState({
      player1,
      player2,
      game,
      currentScreen: 'game'
    });
  }

  render() {
    return (
      <AppContainer className="App">
        <AppOverlay>
          { this.getActiveScreen() }
        </AppOverlay>
      </AppContainer>
    );
  }
}

export default App;
