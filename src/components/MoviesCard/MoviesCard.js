import React from "react";
import {BASE_MOVIES_URL} from "../../utils/constants";

function MoviesCard({ movie, onSaveMovie, onDeleteMovie,savedMovies }) {

    const isSaved = savedMovies.find((item) => item.movieId === movie.id);

    function converter (duration) {
        const hours = Math.floor(duration / 60);
        const minutes = Math.floor(duration % 60);
        return `${hours}ч ${minutes}м`;
    }

    function handleSaveMovie() {

        if (!isSaved) {
            onSaveMovie(movie);
        } else {
            onDeleteMovie(movie);
        }
    }

    function handleDeleteMovie() {

        onDeleteMovie(movie);
    }

    return (

        <article className="movie">
            <div className="movie__info">
            <div className="movie__header">
                <h2 className="movie__title">{movie.nameRU}</h2>
                <p className="movie__duration">{converter (movie.duration)}</p>
            </div>
                <button type="button"
                        className={`movie__button${isSaved ? ' movie__button_saved' : ''}${(window.location.pathname === '/saved-movies') ? ' movie__button_delete' : ''}`}
                        onClick={(window.location.pathname === '/saved-movies') ? (handleDeleteMovie) : (handleSaveMovie)}
                ></button>
            </div>
            <div className="movie__container">
                <img className="movie__image" src={movie.image.url ? `${BASE_MOVIES_URL}/${movie.image.url}` : movie.image} alt={movie.nameRU} />
            </div>

        </article>
    );
}

export default MoviesCard;