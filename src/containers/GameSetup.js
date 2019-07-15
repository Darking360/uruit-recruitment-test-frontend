import React, { Component } from 'react';
import { GameFieldSet, GameButton } from '../components/Form';
import AvatarPicker from '../components/AvatarPicker';
import styled from 'styled-components';
import media from "styled-media-query";
import Spinner from '../components/Spinner';
import { createUser, createGame } from '../api';
import { alertError } from '../utils';
import PropTypes from 'prop-types';

const GameSetupContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 75%;
    margin: 0 auto;
    h1,h2,h3 {
        text-align: center;
    }
    h1 {
        font-size: 3rem;
        margin-bottom: 0;
    }
    h2 {
        font-size: 2rem;
    }
    h3 {
        font-size: 1.6rem;
        text-align: center;
    }
    div.action-row {
        margin-top: 1rem;
        box-sizing: border-box;
    }
    ${media.lessThan("large")`
        h1 {
            font-size: 2.2rem;
        }
        h2 {
            font-size: 1.4rem;
        }
        h3 {
            margin-top: 0;
            font-size: 1rem;
        }
    `}
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
    ${media.lessThan("large")`
        flex-direction: column
    `}
`;

const SetupRow = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    ${media.lessThan("large")`
        flex-direction: column
    `}
`;

class GameSetup extends Component {

    state = {
        player1: '',
        player2: '',
        player1Avatar: 'OW-icon_bastion',
        player2Avatar: 'OW-icon_mercy',
        loading: false
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

    handleGameCreation = (e) => {
        e.preventDefault();
        const { player1, player2, player1Avatar, player2Avatar } = this.state;
        if (player1 === player2) {
            alertError('Please choose different usernames');
            return;
        }
        const { setGame } = this.props;
        this.setState({ loading: true }, async () => {
            try {
                const { data: player1Response } = await createUser(player1.toLowerCase(), player1Avatar);
                const { data: player2Response } = await createUser(player2.toLowerCase(), player2Avatar);
                const { data: game } = await createGame(player1Response._id, player2Response._id);
                setGame(player1Response, player2Response, game);
            } catch (error) {
                if (error.response) {
                    const { data } = error.response;
                    alertError(data.errors[0].msg);
                    return;
                }
                alertError('Internal error');
            }
        });
    }

    render() {
        const { loading } = this.state;
        const disabled = this.isDisabled();
        return (
            <GameSetupContainer>
                <Spinner width={window.innerWidth < 1170 ? "25%" : "10%"} />
                <h1>UruIt Game of Drones</h1>
                <h2>Welcome to the Hill</h2>
                <h3>Get your name and tap the avatar so the hill can change it for you</h3>
                <SetupRow onSubmit={this.handleGameCreation}>
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
                    <GameButton 
                        onClick={this.handleGameCreation} 
                        disabled={disabled || loading} 
                        fsize="4em"
                        loadingAction={loading}
                        id="setup"
                        type="button"
                    >
                        {
                            loading ? (<Spinner width="5rem" />)
                            : <span>Play</span>
                        }
                    </GameButton>
                </div>
            </GameSetupContainer>
        );
    }
}

GameSetup.propTypes = {
    setGame: PropTypes.func.isRequired
};

export default GameSetup;