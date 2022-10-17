import React from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function SavedMovies({onSearch, onSaveMovie, onDeleteMovie, savedMovies, onSubmitCheckbox, preloaderTime})
{
    return(

        <div className="movies">

            <SearchForm onSearch={onSearch}
                        onSubmitCheckbox={onSubmitCheckbox}/>

            {preloaderTime ? (
                <Preloader />
            ) : (
            <MoviesCardList foundMovies={savedMovies}
                            onSaveMovie={onSaveMovie}
                            onDeleteMovie={onDeleteMovie}
                            savedMovies={savedMovies}/>
            )}
        </div>

    );
}

export default SavedMovies;