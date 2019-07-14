import React from 'react';
import styled, { keyframes } from 'styled-components';

export const floatingEffect = keyframes`
    0% {
        box-shadow: 0 2px 8px rgba(255,255,255,0.30), 0 3px 6px rgba(255,255,255,0.22);
    }

    50% {
        box-shadow: 0 19px 28px rgba(255,255,255,0.30), 0 15px 12px rgba(255,255,255,0.22);
    }

    100% {
        box-shadow: 0 2px 8px rgba(255,255,255,0.30), 0 3px 6px rgba(255,255,255,0.22);
    }
`;

export const GameButton = styled.button`
    background-color: #d38627;
    color: white;
    padding: 1rem 2rem;
    padding-right: 3rem;
    font-family: 'Bigno';
    border: none;
    font-weight: bold;
    border-top-left-radius: 40px;
    border-bottom-right-radius: 40px;
    transition: all .3s ease-in-out;
    cursor: pointer;
    font-size: ${({ fsize }) => fsize ? fsize : '3rem'};
    &:focus, &:active {
        outline: none;
    }
    animation: ${floatingEffect} 3s infinite;
    &:hover {
        padding: 1rem 3rem;
        padding-right: 4rem;
        border-top-left-radius: 0;
        border-bottom-right-radius: 0;
        border-top-right-radius: 40px;
        border-bottom-left-radius: 40px;
    }
    ${({ disabled }) => disabled && `
        cursor: inherit;
        background-color: grey;
    `}
    ${({ loadingAction }) => loadingAction && `
        font-size: unset;
        padding: 1rem;
        border-radius: 40px;
        &:hover {
            padding: 1rem;
            border-top-left-radius: 40px;
            border-bottom-right-radius: 40px;
            border-top-right-radius: 40px;
            border-bottom-left-radius: 40px;
        }
    `}
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

export const FieldSet = styled.div`
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
            <label htmlFor={name}>{label}</label>
            <GameField
                value={value}
                onChange={onChange}
                name={name}
                id={name}
            />
        </FieldSet>
    );
}