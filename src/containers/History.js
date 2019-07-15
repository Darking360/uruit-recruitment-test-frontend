import React, { Component } from 'react';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import PropTypes from 'prop-types';

const RowAnimation = posed.li({
    enter: {
      opacity: 1,
      delay: 300
    }
  });

const HistoryContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const HistoryGrid = styled.ul`
    height: 80%;
    max-height: 80vh;
    width: 60%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    &::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: rgba(0,0,0,.75);
    }

    &::-webkit-scrollbar
    {
        width: 8px;
        background-color: rgba(0,0,0,.75);
    }

    &::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #d38627;
    }
`;

export const HistoryItem = styled(RowAnimation)`
    display: grid;
    grid-template-columns: 50% 50%;
    width: 100%;
    margin: 0 auto;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid white;
    span {
        font-size: 1.6em;
        padding: .5rem;
    }
`;

class History extends Component {

    renderItems = () => {
        const { game } = this.props;
        return game.plays.map((play, index) => (
            <HistoryItem key={index}>
                <span>{index + 1}</span>
                <span>{play.winner ? this.props[play.winner].username : 'Tie'}</span>
            </HistoryItem>
        ))
    }

    render() {
        return (
            <HistoryContainer>
                <h2>Score</h2>
                <HistoryGrid>
                    <HistoryItem >
                        <span>Round</span>
                        <span>Winner</span>
                    </HistoryItem>
                    <PoseGroup>
                        { this.renderItems() }
                    </PoseGroup>
                </HistoryGrid>
            </HistoryContainer>
        );
    }
}

History.propTypes = {
    game: PropTypes.object.isRequired
};

export default History;