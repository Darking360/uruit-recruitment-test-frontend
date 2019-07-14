import React, { Component } from 'react';
import styled from 'styled-components';

const HistoryContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const HistoryGrid = styled.section`
    height: 80%;
    max-height: 80vh;
    width: 60%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
`;

const HistoryItem = styled.div`
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
                    { this.renderItems() }
                </HistoryGrid>
            </HistoryContainer>
        );
    }
}

export default History;