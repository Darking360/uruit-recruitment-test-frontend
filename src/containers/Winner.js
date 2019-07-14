import React from 'react';
import styled from 'styled-components';
import { GameButton } from '../components/Form';
import AvatarPicker from '../components/AvatarPicker';

const WinnerContainer = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Winner = (props) => {

    const winner = props[props.game.winner];

    return (
        <WinnerContainer>
            <h2>We have a Winner!!</h2>
            <AvatarPicker value={winner.avatar} present />
            <h3>{winner.username} is the new EMPEROR!</h3>
            <GameButton onClick={props.resetGame}>
                Play Again
            </GameButton>
        </WinnerContainer>
    );
}

export default Winner;