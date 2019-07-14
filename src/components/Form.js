import React from 'react';
import styled, { keyframes } from 'styled-components';

const shadowField = keyframes`

`;

export const GameButton = styled.button`
    background-color: yellow;
    color: white;
    padding: 1rem 2rem;
    padding-right: 3rem;
    font-family: 'Bigno';
    border: none;
    font-weight: bold;
    font-size: ${({ fsize }) => fsize ? fsize : '3rem'};
`;

export const GameField = styled.input`
    padding: 1rem;
    background-color: rgba(0,0,0,0.55);
    border: 1px solid white;
    border-radius: 10px;
    color: white;
    font-size: 1.3rem;
    font-family: 'Bigno';
    box-shadow: 1px 1px white;
    transition: all .5s ease-in-out;
    width: 15em;
    max-width: auto;
    &:active, &:focus {
        outline: none;
        border: 2px solid yellow;
        width: 65%;
        max-width: 65%;
    }
`;

const FieldSet = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    label {
        font-size: 1.8rem;
        margin-right: 2rem;
    }
`;

export const GameFieldSet = ({ value, onChange, label, name }) => {
    return (
        <FieldSet className="fieldset">
            <label htmlFor="player1">{label}</label>
            <GameField
                value={value}
                onChange={onChange}
                name={name}
                id="player1"
            />
        </FieldSet>
    );
}