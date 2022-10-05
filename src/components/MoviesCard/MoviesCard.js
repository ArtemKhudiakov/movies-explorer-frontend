import React from "react";
import {useState} from "react";

function MoviesCard({ title, duration, image, isSaved }) {


    const [isOwn, setIsOwn] = useState(false);

    const toggleIsOwn = () => {
        if (isOwn) {
            setIsOwn(false);
        } else setIsOwn(true);
    };


    return (

        <article className="movie">
            <div className="movie__info">
            <div className="movie__header">
                <h2 className="movie__title">{title}</h2>
                <p className="movie__duration">{duration}</p>
            </div>
                <button type="button" className={`movie__button${isSaved ? ' movie__button_saved' : ''}${(window.location.pathname === '/saved-movies') ? ' movie__button_delete' : ''}`}></button>
            </div>
            <div className="movie__container">
                <img className="movie__image" src={image} alt={title} />
            </div>

        </article>
    );
}

export default MoviesCard;