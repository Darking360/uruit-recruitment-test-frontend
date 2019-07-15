import React, { Component } from 'react';
import MovePicker from '../components/MovePicker';
import { GameButton } from '../components/Form';
import Spinner from '../components/Spinner';
import styled from 'styled-components';
import media from "styled-media-query";
import { alertError } from '../utils';
import { addPlayToGame } from '../api';
import History from './History';
import PropTypes from 'prop-types';

const GameContainer = styled.section`
    width: 100%;
    min-height: 100vh;
    height: 100%;
    display: flex;
    ${media.lessThan("large")`
        flex-direction: column;
    `}
`;

const GamePanel = styled.div`
    width: 50%;
    background-color: rgba(211,134,39,0.25);
    min-height: 100vh;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div.top-info {
        display: flex;
        flex-direction: column;
        div.round-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            h2 {
                margin-top: 0;
                font-size: 2.5em;
            }
            h3 {
                margin-top: 0;
                font-size: 2em;
            }
        }
    }
    ${media.lessThan("large")`
        width: 100%;
        max-height: 50vh;
        min-height: 50vh;
        height: 100%;
        flex-direction: column;
        div.top-info {
            flex-direction: row;
            div {
                width: 50%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            div.move-selector {
                h3 {
                    font-size: 1.2rem;
                    text-align: center;
                }
                em {
                    font-size: 1rem;
                    text-align: center;
                }
            }
            div.round-info {
                h2 {
                    font-size: 1.8rem;
                    text-align: center;
                }
                h3 {
                    font-size: 1.2rem;
                    text-align: center;
                }
            }
        }
    `}
`;

const CountPanel = styled.div`
    width: 50%;
    background-color: rgba(0,0,0,0.87);
    min-height: 100vh;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    ${media.lessThan("large")`
        width: 100%;
        max-height: 50vh;
        min-height: 50vh;
        justify-content: flex-start;
    `}
`;

class Game extends Component {

    state = {
        round: 1,
        player1Move: 1,
        player2Move: 1,
        activePlayer: { username: '' },
        ativeTag: 'player1',
        loading: false
    };

    componentDidMount() {
        const { player1 } = this.props;
        this.setState({ activePlayer: player1, activeTag: 'player1' });
    }

    selectMove = (name, move) => {
        this.setState({ [`${name}Move`]: move });
    }

    lockMove = () => {
        const { activeTag } = this.state;
        let nextTag = 'player1';
        let options = { loading: true };
        if (activeTag === 'player1') { 
            nextTag = 'player2';
            options.loading = false;
        };
        this.setState({ activeTag: nextTag, activePlayer: this.props[nextTag], ...options }, () => {
            if (this.state.loading) {
                this.addPlayToGame();
            }
        });
    }

    addPlayToGame = async () => {
        const { player1Move, player2Move, round } = this.state;
        const { game, updateGame } = this.props;
        try {
            const { data: gameResponse } = await addPlayToGame(game._id, player1Move, player2Move);
            this.setState({ loading: false, round: round + 1 }, () => {
                updateGame(gameResponse.game, gameResponse.winner);
            });
        } catch (error) {
            if (error.response) {
                const { data } = error.response;
                alertError(data.errors[0].msg);
                return;
            }
            alertError('Internal error');
        }
    }

    render() {
        const { round, activeTag, activePlayer, loading } = this.state;
        const buttonCopy = activeTag === 'player2' ? 'PLAY' : 'SET MOVE';
        return (
            <GameContainer>
                <GamePanel>
                    <div className="top-info">
                        <div className="round-info">
                            <h2>Round {round}</h2>
                            <h3>{activePlayer.username}'s play</h3>
                        </div>
                        <div className="move-selector">
                            <MovePicker 
                                value={this.state[`${activeTag}Move`]}
                                name={activeTag}
                                onChange={this.selectMove}
                            />
                        </div>
                    </div>
                    <div className="next-or-play">
                        <GameButton noFont={loading} onClick={this.lockMove}>
                            {
                                loading ? (<Spinner width="5rem" />)
                                : buttonCopy
                            }
                        </GameButton>
                    </div>
                </GamePanel>
                <CountPanel>
                    <History {...this.props} />
                </CountPanel>
            </GameContainer>
        );
    }
}

Game.propTypes = {
    player1: PropTypes.object,
    player2: PropTypes.object,
    game: PropTypes.object,
    updateGame: PropTypes.func
};

export default Game;