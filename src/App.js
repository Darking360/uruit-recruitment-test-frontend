import React, { Component } from 'react';
import GameSetup from './containers/GameSetup';
import Game from './containers/Game';
import Winner from './containers/Winner';
import Statistics from './containers/Statistics';
import styled, { keyframes } from 'styled-components';
import media from "styled-media-query";
import { GameButton, floatingEffect } from './components/Form';

const shakeRotateAnimation = keyframes`
  0% { 
    margin-left: 0;
  }
  10% { 
    margin-left: -3px;
    transform: rotate(15deg);
  }
  15% { 
    margin-left: 5px;
    transform: rotate(10deg);
  }
  20% { 
    margin-left: -8px;
    transform: rotate(1deg);
  }
  25% { 
    margin-left: 8px;
    transform: rotate(0deg);
  }
  30% { 
    margin-left: -5px;
    transform: rotate(-15deg);
  }
  40% { 
    margin-left: 3px;
    transform: rotate(-10deg);
  }
  50% { 
    margin-left: 0;
    transform: rotate(0deg);
  }
  0% { 
    margin-left: 0;
  }
  60% { 
    margin-left: -3px;
  }
  65% { 
    margin-left: 5px;
  }
  70% { 
    margin-left: -8px;
  }
  75% { 
    margin-left: 8px;
  }
  80% { 
    margin-left: -5px;
  }
  90% { 
    margin-left: 3px;
  }
  100% { 
    margin-left: 0;
  }
`;

const PositionedGameButton = styled(GameButton)`
  position: absolute;
  left: 5%;
  bottom: 5%;
  animation: ${shakeRotateAnimation} 3s infinite, ${floatingEffect} 3s infinite;
  &:hover {
    animation: ${floatingEffect} 3s infinite;
  }
  ${media.lessThan("large")`
    left: unset;
    bottom: unset;
    right: 5%;
    top: 5%;
    padding: 1rem;
    font-size: 1.8rem;
    ${({ screen }) => screen === 'game' && `
      left: unset;
      bottom: unset;
      right: 5%;
      top: 48%;
    `}
  `}
`;

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
  position: relative;
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
      case 'statistics':
        return <Statistics lastScreen={this.state.lastScreen} goBackTo={this.goBackTo} />
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

  openStatistics = () => {
    this.setState({ currentScreen: 'statistics', lastScreen: this.state.currentScreen });
  }

  goBackTo = (currentScreen) => {
    this.setState({ currentScreen });
  }

  render() {
    const { currentScreen } = this.state;
    const displayIcon = window.innerWidth < 1170;
    return (
      <AppContainer className="App">
        <AppOverlay>
          { this.getActiveScreen() }
          {
            currentScreen !== 'statistics' && (
              <PositionedGameButton screen={currentScreen} onClick={this.openStatistics}>
                { displayIcon ? '📝' : 'Leader Boards' }
              </PositionedGameButton>
            )
          }
        </AppOverlay>
      </AppContainer>
    );
  }
}

export default App;
