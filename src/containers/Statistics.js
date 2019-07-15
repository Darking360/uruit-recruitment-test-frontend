import React, { Component } from 'react';
import styled from 'styled-components';
import media from "styled-media-query";
import Spinner from '../components/Spinner';
import { GameButton } from '../components/Form';
import { HistoryGrid, HistoryItem } from './History';
import { getUsers } from '../api';
import { alertError } from '../utils';
import PropTypes from 'prop-types';

const StatisticsContainer = styled.section`
    width: 80%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    h2, section, button {
        margin-top: 3rem;
    }
`;

export const EnhancedItem = styled(HistoryItem)`
    grid-template-columns: 50% 1fr 1fr;
`;

class Statistics extends Component {

    state = {
        users: [],
        loading: true
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const { data: users } = await getUsers();
            this.setState({ users, loading: false });
        } catch (error) {
            if (error.response) {
                const { data } = error.response;
                alertError(data.errors[0].msg);
                return;
            }
            alertError('Internal error');
        }
    }

    goBack = () => {
        const { goBackTo, lastScreen } = this.props;
        goBackTo(lastScreen);
    }

    renderItems = () => {
        const { users } = this.state;
        return users.map((user) => (
            <EnhancedItem key={user._id}>
                <span>{user.username}</span>
                <span>{user.games.length}</span>
                <span>{this.getWins(user)}</span>
            </EnhancedItem>
        ));
    }

    getWins = (user) => {
        return user.games.reduce((a,b) => {
            if (b[b.winner] === user._id) {
                return a + 1;
            }
            return a;
        }, 0);
    }

    render() {
        const { loading } = this.state;
        return (
            <StatisticsContainer>
                <h2>Statistics</h2>
                <HistoryGrid>
                    <EnhancedItem>
                        <span>Player</span>
                        <span>Games</span>
                        <span>Wins</span>
                    </EnhancedItem>
                    {
                        loading ? (<Spinner key="spinner" width={window.innerWidth < 1170 ? "5rem" : "5rem"} />)
                        : this.renderItems()
                    }
                </HistoryGrid>
                <GameButton onClick={this.goBack}>Go Back</GameButton>
            </StatisticsContainer>
        );
    }
}

Statistics.propTypes = {
    goBackTo: PropTypes.func.isRequired, 
    lastScreen: PropTypes.string.isRequired
};

export default Statistics;