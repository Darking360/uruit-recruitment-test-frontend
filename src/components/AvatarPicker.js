import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

let mojs = {}

// Validation in order to work with Node environments build phase
if (typeof window !== `undefined` && process.env.NODE_ENV !== 'test') {
  mojs = require('mo-js');
}

export const floatingEffect = keyframes`
    0% {
        box-shadow: 0 2px 8px rgba(255,255,255,0.30), 0 3px 6px rgba(255,255,255,0.22);
    }

    50% {
        box-shadow: 0 14px 28px rgba(255,255,255,0.25), 0 10px 10px rgba(255,255,255,0.22);
    }

    100% {
        box-shadow: 0 2px 8px rgba(255,255,255,0.30), 0 3px 6px rgba(255,255,255,0.22);
    }
`;

const avatars = [
    'OW-icon_bastion',
    'OW-icon_dva',
    'OW-icon_genji',
    'OW-icon_hanzo',
    'OW-icon_junkrat',
    'OW-icon_lucio',
    'OW-icon_mccree',
    'OW-icon_mei',
    'OW-icon_mercy',
    'OW-icon_pharah',
    'OW-icon_reaper',
    'OW-icon_reinhardt',
    'OW-icon_roadhog',
    'OW-icon_soldier76',
    'OW-icon_symmetra',
    'OW-icon_torbjorn',
    'OW-icon_tracer',
    'OW-icon_widowmaker',
    'OW-icon_winston',
    'OW-icon_zarya',
    'OW-icon_zenyatta',
];

// Add floating animation to avatar
export const Avatar = styled.img`
    width: 6rem;
    height: 6rem;
    object-fit: fill;
    border: 3px solid rgba(255,255,255,0.75);
    border-radius: 50%;
    padding: 1rem;
    cursor: pointer;
    animation: ${floatingEffect} 3s infinite;
    transition: all 2s ease-in-out;
    position: relative;
    ${({ present }) => present && `
        cursor: inherit;
    `}
`;

export const AvatarPickerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

class AvatarPicker extends Component {

    playBurst = () => {
        const color = '#d38627';
        if (this.moAnimation) this.moAnimation.replay();
        else {
            this.moAnimation = new mojs.Burst({
                parent:   ReactDOM.findDOMNode(this.avatar),
                radius:   { 80: 110 },
                angle:    30,
                count:    14,
                children: {
                radius:       8,
                fill:         color,
                scale:        { 1: 0, easing: 'sin.in' },
                pathScale:    [ .9, null ],
                degreeShift:  [ 13, null ],
                duration:     [ 500, 700 ],
                }
            });
            this.moAnimation.play();
        }
    }

    handleChange = () => {
        const { onChange, name } = this.props;
        this.playBurst();
        const nextAvatar = Math.floor(Math.random() * 21) + 1;
        onChange(name, avatars[nextAvatar-1]);
    }

    render() {
        const { value } = this.props;
        return (
            <AvatarPickerContainer ref={avatar => this.avatar = avatar}>
                <Avatar
                    src={`../images/${value}.svg`}
                    alt='Avatar preview'
                    onClick={!this.props.present ? this.handleChange : null}
                    present={this.props.present}
                />
            </AvatarPickerContainer>
        );
    }
}

AvatarPicker.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default AvatarPicker;