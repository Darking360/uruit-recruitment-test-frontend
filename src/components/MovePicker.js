import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Avatar, AvatarPickerContainer } from './AvatarPicker';

let mojs = {}

// Validation in order to work with Node environments build phase
if (typeof window !== `undefined` && process.env.NODE_ENV !== 'test') {
  mojs = require('mo-js');
}

const movements = {
    '1': 'paper',
    '2': 'scissors',
    '3': 'rock'
};

const Container = styled(AvatarPickerContainer)`
    flex-direction: column;
    font-size: 1.5em;
    em, h3 {
        margin-top: 1.5rem;
    }
`;

const EnhancedAvatar = styled(Avatar)`
    background-color: white;
`;

class MovePicker extends Component {

    playBurst = () => {
        const color = '#e53935';
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
        const { name, onChange, value } = this.props;
        if ((value + 1) > 3) {
            onChange(name, 1);
            return;
        }
        onChange(name, value + 1);
    }

    // Add shake phone function

    render() {
        const { value } = this.props;
        return (
            <Container ref={avatar => this.avatar = avatar}>
                <EnhancedAvatar 
                    src={`../images/${movements[value]}.png`}
                    alt='Avatar preview'
                    onClick={this.handleChange}
                />
                <em>Tap the image or shake your phone to change your attack</em>
                <h3>Attacking with {movements[value]}</h3>
            </Container>
        );
    }
}

MovePicker.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

MovePicker.defaultProps = {
    value: 1,
    name: 'player1'
};

export default MovePicker;