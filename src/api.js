import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production' ? 'tbd' : 'http://localhost:3000';

export function createUser(username, userAvatar) {
    return axios.post(`${baseUrl}/users`, {
        username,
        userAvatar
    });
}

export function createGame(player1, player2) {
    return axios.post(`${baseUrl}/games`, {
        player1,
        player2
    });
}

export function addPlayToGame(gameId, player1Play, player2Play) {
    return axios.post(`${baseUrl}/games/add_play/${gameId}`, {
        player1Play,
        player2Play
    });
}

export function getUser(username) {
    return axios.get(`${baseUrl}/users/by_username/${username}`);
}

export function getGame(gameId) {
    return axios.get(`${baseUrl}/games/${gameId}`);
}

export function getGames() {
    return axios.get(`${baseUrl}/games`);
}

export function getUsers() {
    return axios.get(`${baseUrl}/users`);
}