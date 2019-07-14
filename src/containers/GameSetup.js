import React, { Component } from 'react';
import { GameFieldSet, GameButton } from '../components/Form';
import AvatarPicker from '../components/AvatarPicker';
import styled from 'styled-components';
import { createUser, createGame } from '../api';

const GameSetupContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 75%;
    margin: 0 auto;
    h2, h3 {
        font-size: 2rem;
        text-align: center;
    }
    div.action-row {
        margin-top: 1rem;
        box-sizing: border-box;
    }
`;

const PlayerOptions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    .fieldset {
        margin-top: 1rem;   
    }
    margin-bottom: 1rem;
`;

const SetupRow = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
`;

class GameSetup extends Component {

    state = {
        player1: '',
        player2: '',
        player1Avatar: 'OW-icon_bastion',
        player2Avatar: 'OW-icon_mercy'
    };

    onChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }

    changeAvatar = (name, avatar) => {
        this.setState({ [name]: avatar });
    }

    isDisabled = () => {
        const { player1, player2 } = this.state;
        return !(player1.length && player2.length);
    }

    handleGameCreation = () => {
        const { player1, player2 } = this.state;
        
    }

    render() {
        const disabled = this.isDisabled()
        return (
            <GameSetupContainer>
                <h2>Welcome to the Hill</h2>
                <h3>Get your name and the hill will provide you an avatar</h3>
                <SetupRow>
                    <PlayerOptions>
                        <AvatarPicker
                            value={this.state.player1Avatar}
                            onChange={this.changeAvatar}
                            name="player1Avatar"
                        />
                        <GameFieldSet  
                            label="Player 1"
                            value={this.state.player1}
                            onChange={this.onChange}
                            name={'player1'}
                        />
                    </PlayerOptions>
                    <PlayerOptions>
                        <AvatarPicker
                            value={this.state.player2Avatar}
                            onChange={this.changeAvatar}
                            name="player2Avatar"
                        />
                        <GameFieldSet  
                            label="Player 2"
                            value={this.state.player2}
                            onChange={this.onChange}
                            name={'player2'}
                        />
                    </PlayerOptions>
                </SetupRow>
                <div className="action-row">
                    <GameButton onClick={this.handleGameCreation} disabled={disabled} fsize="4em">Play</GameButton>
                </div>
            </GameSetupContainer>
        );
    }
}

export default GameSetup;