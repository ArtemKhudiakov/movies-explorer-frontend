import React from "react";

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonMore from "../ButtonMore/ButtonMore";
import Preloader from "../Preloader/Preloader";

function Movies({onSearch, foundMovies, savedMovies, onSaveMovie, onDeleteMovie, onSubmitCheckbox, preloaderTime}) {

    return(
        <div className="movies">
            <SearchForm onSearch={onSearch}
                        onSubmitCheckbox={onSubmitCheckbox}/>
            {preloaderTime ? (
                <Preloader />
            ) : (
                <MoviesCardList foundMovies={foundMovies}
                                onSaveMovie={onSaveMovie}
                                onDeleteMovie={onDeleteMovie}
                                savedMovies={savedMovies} />
                )}
            <ButtonMore />
        </div>
    );
}

export default Movies;