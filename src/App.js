import React, { Component } from 'react';
import GameSetup from './containers/GameSetup';
import Game from './containers/Game';
import Winner from './containers/Winner';
// Statistics here please
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

const initialState = {
  currentScreen: 'setup',
  game: null,
  player1: null,
  player2: null
};

class App extends Component {

  state = {
    ...initialState
  };

  getActiveScreen = () => {
    const { currentScreen } = this.state;
    switch(currentScreen) {
      case 'setup':
        return <GameSetup setGame={this.setGame} />;
      case 'game':
        return <Game {...this.state} updateGame={this.updateGame} />
      case 'winner':
        return <Winner {...this.state} resetGame={this.resetGame} />
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

  updateGame = (game, win = false) => {
    this.setState({ game, currentScreen: win ? 'winner' : 'game' });
  }

  resetGame = () => {
    this.setState({ ...initialState });
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
