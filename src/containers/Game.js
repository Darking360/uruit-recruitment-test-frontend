import React, { Component } from 'react';
import MovePicker from '../components/MovePicker';
import styled from 'styled-components';

const GameContainer = styled.section`
    width: 100%;
    min-height: 100vh;
    height: 100%;
    display: flex;
`;

const GamePanel = styled.div`
    width: 50%;
    background-color: rgba(211,134,39,0.25);
    min-height: 100vh;
    height: 100%;
    display: flex;
    justify-content: center;
    div.round-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

const CountPanel = styled.div`
    width: 50%;
    background-color: rgba(0,0,0,0.87);
    min-height: 100vh;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

class GameSetup extends Component {

    state = {
        round: 1,
        player1Move: 1,
        player2Move: 1,
        activePlayer: null,
        ativeTag: 'player1'
    };

    componentDidMount() {
        const { player1 } = this.props;
        this.setState({ activePlayer: player1, activeTag: 'player1' });
    }

    selectMove = (name, move) => {
        console.log('Aiuda ---->')
        console.log(name)
        console.log(move)
        this.setState({ [`${name}Move`]: move }, () => {
            console.log(this.state);
        });
    }

    render() {
        const { round, activeTag } = this.state;
        return (
            <GameContainer>
                <GamePanel>
                    <div className="round-info">
                        <h2>Round {round}</h2>
                        <h3>Miguel's play</h3>
                    </div>
                    <div className="move-selector">
                        <MovePicker 
                            value={this.state[`${activeTag}Move`]}
                            name={activeTag}
                            onChange={this.selectMove}
                        />
                    </div>
                    <div className="next-or-play">

                    </div>
                </GamePanel>
                <CountPanel>
                    <h5>Count</h5>
                </CountPanel>
            </GameContainer>
        );
    }
}

export default GameSetup;