import React from 'react';
import styled, { keyframes } from 'styled-components';

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
const Avatar = styled.img`
    width: 6rem;
    height: 6rem;
    object-fit: fill;
    border: 3px solid rgba(255,255,255,0.75);
    border-radius: 50%;
    padding: 1rem;
    cursor: pointer;
`;

const AvatarPickerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AvatarPicker = ({ value, onChange, name }) => {

    const handleChange = () => {
        const nextAvatar = 'OW-icon_dva';// random number to get next avatar between 1 and 21
        console.log(nextAvatar)
        onChange(name, nextAvatar);
    }

    // TODO Add moJS on click action and animation of floating
    return (
        <AvatarPickerContainer>
            <Avatar 
                src={`../images/${value}.svg`}
                alt='Avatar preview'
                onClick={handleChange}
            />
        </AvatarPickerContainer>
    );
}

export default AvatarPicker;