import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import ButtonMore from "../ButtonMore/ButtonMore";
import {useLocation, Route} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    WIDTH_320,
    WIDTH_768,
    WIDTH_1280,
    WIDTH_1125,
    FULL_CARDS,
    SEARCH_1280,
    SEARCH_768,
    SEARCH_320,
    ADD_1280,
    ADD_768,
    ADD_320

} from "../../utils/constants";

function MoviesCardList({foundMovies, onSaveMovie, onDeleteMovie, savedMovies})
{
    const location = useLocation().pathname;
    const [maxCards, setMaxCards] = useState(SEARCH_1280);
    const [movieList, setMovieList] = useState([]);
    const [deviceWidth, setDeviceWidth] = useState(WIDTH_1280);

    useEffect(() => {
        setMovies();
    }, [maxCards]);

    useEffect(() => {
        checkDeviceWidth();
    }, [deviceWidth, foundMovies, location]);

    useEffect(() => {
        addListener();
        return () => removeListener();
    }, [deviceWidth]);

    function setFoundMovies(count) {

        setMaxCards(count);
        let movies = [];
        foundMovies.forEach((item, i) => {
            if (i < count) {
                movies.push(item);
            }
        });
        setMovieList(movies);
    }

    function checkDeviceWidth() {
        if (deviceWidth >= WIDTH_1280) {setFoundMovies(SEARCH_1280);
        } else if (deviceWidth >= WIDTH_768) {setFoundMovies(SEARCH_768);
        } else if (deviceWidth >= WIDTH_320) {setFoundMovies(SEARCH_320);
        } if (location.pathname === "/saved-movies") {setMaxCards(FULL_CARDS);
        }
    }

    function handleSubscribeResize() {
        setDeviceWidth(window.innerWidth);
    }

    function addListener() {
        window.addEventListener("resize", handleSubscribeResize);
    }

    function removeListener() {
        window.removeEventListener("resize", handleSubscribeResize);
    }

    function setMovies() {

        let movies = [];
        foundMovies.forEach((item, i) => {
            if (i < maxCards) {
                movies.push(item);
            }
        });
        setMovieList(movies);
    }

    function handleAddButtonClick() {
        if (deviceWidth >= WIDTH_1125) {setMaxCards(maxCards + ADD_1280);
        } else if (deviceWidth >= WIDTH_768) {setMaxCards(maxCards + ADD_768);
        } else if (deviceWidth >= WIDTH_320) {setMaxCards(maxCards + ADD_320);
        } else {setMaxCards(maxCards + ADD_320);
        }
    }

    return(

        <section className="movies-card-list">

            {movieList
                .map((item, key) => (
                    <li className="movies-card-list__item" key={key}>
                        <MoviesCard movie={item}
                                    key={item.id || item._id}
                                    onSaveMovie={onSaveMovie}
                                    onDeleteMovie={onDeleteMovie}
                                    savedMovies={savedMovies}/>
                    </li>

                ))
            }
            {foundMovies.length !== movieList.length ? (

                <Route path="/movies">
                    <ButtonMore onClick={handleAddButtonClick}/>
                </Route>

            ) : (

                ""
            )}

        </section>

    );
}

export default MoviesCardList;
