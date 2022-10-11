import { BASE_URL } from './constants';

const CONFIG = {
    baseUrl: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
};

function checkResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}

export const register = (username, email, password) => {

    return fetch(`${CONFIG.baseUrl}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: CONFIG.headers,
        body: JSON.stringify({
            "name": username,
            "email": email,
            "password": password
        })
    })
        .then(response => checkResponse(response));
}

export const login = (email, password) => {

    return fetch(`${CONFIG.baseUrl}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: CONFIG.headers,
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then(response => checkResponse(response));
}

export const update = (name, email) => {

    const token = localStorage.getItem('jwt');

    return fetch(`${CONFIG.baseUrl}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            ...CONFIG.headers,
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            "name": name,
            "email": email
        })
    })
        .then(response => checkResponse(response));

}

export const getUser = () => {

    return fetch(`${CONFIG.baseUrl}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: CONFIG.headers,
    })
        .then(response => checkResponse(response));
}

export const checkToken = () => {

    const token = localStorage.getItem('jwt');

    return fetch(`${CONFIG.baseUrl}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            ...CONFIG.headers,
            Authorization: `Bearer ${token}`,
        }
    })
        .then(response => checkResponse(response));
}