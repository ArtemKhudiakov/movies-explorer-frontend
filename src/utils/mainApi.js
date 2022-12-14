import { BASE_URL } from './constants';

export class MainApi {

    constructor({ url }) {
        this._url = url;
    }

    _checkResponse(res) {

        return res.ok
            ? res.json()
            : Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {

        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then(this._checkResponse);
    }

    updateUserInfo(data) {

        return fetch(`${this._url}/users/me`, {

            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        })
            .then(this._checkResponse);
    }

    getSavedMovies() {

        return fetch(`${this._url}/movies`, {

            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then(this._checkResponse);
    }

    createMovie(movie) {

        return fetch(`${this._url}/movies`, {

            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({

                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co/${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: `https://api.nomoreparties.co/${movie.image.url}`,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN
            })
        })
            .then(this._checkResponse);
    }

    deleteMovie(id) {

        return fetch(`${this._url}/movies/${id}`, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then(this._checkResponse);
    }
}

const mainApi = new MainApi({
    url: BASE_URL
});

export default mainApi;
