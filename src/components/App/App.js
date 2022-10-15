import React, {useEffect, useState} from "react";
import {
    Redirect,
    Route,
    Switch,
    useRouteMatch,
    useHistory
} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import * as auth from '../../utils/auth.js';
import moviesApi from "../../utils/MoviesApi.js";
import mainApi from "../../utils/mainApi";
import {SHORT_MOVIE, URL_REGEX} from "../../utils/constants";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        name: "",
        email: "",
        _id: ""
    });

    const noHeader = [
        '/signup',
        '/signin',
        '/404',
    ];

    const noFooter = [
        '/signup',
        '/signin',
        '/404',
        '/Profile',
    ];
    const [isPreloader, setIsPreloader] = useState(false);
    const [allMovies, setAllMovies] = useState([]);
    const [foundMovies, setFoundMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [savedMoviesList, setSavedMoviesList] = useState([]);
    const [infoToolTip, setInfoToolTip] = useState(false);
    const [popupText, setPopupText] = useState('');

    useEffect(() => {
            getSavedMovies();
    }, [isLoggedIn]);

    useEffect(() => {

        tokenCheck();
    }, []);

    useEffect(() => {

        if (!localStorage.getItem("jwt")) {
            handleSignOut();
        }
    }, []);

    useEffect(() => {

        if (localStorage.getItem("searchedMovies") && localStorage.getItem("checkboxStatus")) {
            const checkboxStatus = JSON.parse(localStorage.getItem("checkboxStatus"));
            handleCheckboxMovies(checkboxStatus);
        }
    }, []);

    useEffect(() => {

        if (JSON.parse(localStorage.getItem("loadedMovies"))) {
            if (localStorage.getItem("loadedMovies")) {
                setAllMovies(JSON.parse(localStorage.getItem("loadedMovies")));
            }
        }
    }, [])

    // useEffect(() => {
    //     setSavedMovies(savedMovies);
    //
    // }, [savedMovies]);

    function handleRegister({name, password, email}) {

        setIsLoading(true);
        auth.register({name, password, email})
            .then(() => {
                setPopupText('Вы успешно зарегистрировались!');
                setInfoToolTip(true);

                handleLogin({password, email});
                history.push('/movies');
            })
            .catch((err) => {
                setPopupText('Что-то пошло не так! Попробуйте ещё раз.');
                setInfoToolTip(true);

                console.log(`Ошибка ${err}`);
            });
    }

    function handleLogin({password, email}) {

        auth.authorize({password, email})
            .then((res) => {
                if (res.token) {
                    setIsLoggedIn(true);
                    localStorage.setItem("jwt", res.token);
                    tokenCheck();
                    setPopupText('Вы успешно авторизованы!');
                    setInfoToolTip(true);
                    history.push('/movies');
                }
            })
            .catch((err) => {
                setPopupText('Вы ввели неверный e-mail или пароль!');
                setInfoToolTip(true);

                console.log(`Ошибка ${err}`);
            })
    }

    function tokenCheck() {

        const token = localStorage.getItem("jwt");
        if (token) {
            mainApi.getUserInfo()
                .then((res) => {
                    if (res) {
                        setCurrentUser({
                            name: res.name,
                            email: res.email,
                            _id: res._id
                        });
                        setIsLoggedIn(true);
                    }
                })
                .catch((err) => {
                    if (err.status === 401) {
                        handleSignOut();
                    } else {
                        handleSignOut();
                    }
                });
        }
    }

    function handleSignOut() {

        localStorage.clear();
        setIsLoggedIn(false);
        setCurrentUser({ name: "", email: "", _id: "" });
        localStorage.removeItem("searchedMovies");
        localStorage.removeItem("searchWord");
        localStorage.removeItem("checkboxStatus");
        history.push("/");
    }

    function handleSearchMovies(movie, checked) {

        if (allMovies.length !== 0) {
            const searchMovies = allMovies.filter((item) =>
                item.nameRU.toLowerCase().includes(movie.toLowerCase()));

            const searchMoviesChecked = allMovies.filter((item) =>
                item.nameRU.toLowerCase().includes(movie.toLowerCase()) && item.duration <= SHORT_MOVIE );

            if (searchMovies.length === 0) {
                setPopupText('По вашему запросу ничего не найдено');
                setInfoToolTip(true);
            } else {
                localStorage.setItem("searchedMovies", JSON.stringify(searchMovies));
                localStorage.setItem("searchWord", movie);
                localStorage.setItem("checkboxStatus", JSON.stringify(checked));

                if (!checked) {
                    setFoundMovies(searchMovies);
                } else {
                    setFoundMovies(searchMoviesChecked);
                }
            }
        } else {
            setIsPreloader(true);

            moviesApi.getMovies()
                .then((findMovies) => {

                    findMovies = findMovies.map((item) => {
                        if(!URL_REGEX.test(item.trailerLink)) {
                            item.trailerLink = 'https://www.youtube.com';
                        }
                        return item;
                    });

                    const searchMovies = findMovies.filter((item) =>
                        item.nameRU.toLowerCase().includes(movie.toLowerCase()));

                    if (searchMovies.length === 0) {
                        setPopupText('По вашему запросу ничего не найдено');
                        setInfoToolTip(true);
                    } else {

                        localStorage.setItem("loadedMovies", JSON.stringify(findMovies));
                        setAllMovies(findMovies);
                        localStorage.setItem("searchedMovies", JSON.stringify(searchMovies));
                        localStorage.setItem("searchWord", movie);
                        localStorage.setItem("checkboxStatus", JSON.stringify(checked));
                        setFoundMovies(searchMovies);
                    }
                })
                .catch((err) => {
                    console.log(`Ошибка ${err}`);
                })
                .finally(() => setIsPreloader(false));
        }
    }

    function handleCheckboxMovies(checkbox) {

        let shortMovies;

        let movies = JSON.parse(localStorage.getItem("searchedMovies"));

        if (checkbox) {
            shortMovies = movies.filter((item) => item.duration <= SHORT_MOVIE);
        } else if (!checkbox) {
            shortMovies = movies;
        }
        setFoundMovies(shortMovies);
        localStorage.setItem("checkboxStatus", JSON.stringify(checkbox));
    }

    function handleSaveMovie(movie) {

        mainApi.createMovie(movie)
            .then((res) => {
                setSavedMovies(savedMovies.concat(res));
                setSavedMoviesList(savedMoviesList.concat(res));
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            });
    }

    function handleDeleteMovie(movie) {
        console.log(isLoggedIn)
        mainApi.deleteMovie(movie._id)
            .then(() => {
                const updatedMoviesList = savedMovies.filter((item) => item._id !== movie._id);
                setSavedMovies(updatedMoviesList);
                setSavedMoviesList(savedMoviesList.filter((item) => item._id !== movie._id));
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            });
    }

    function handleDeleteStartMovie(movie) {

        const deletedFilm = savedMovies.find((item) => item.movieId === movie.id);

        mainApi.deleteMovie(deletedFilm._id)
            .then(() => {
                const updatedMoviesList = savedMovies.filter((item) => item._id !== deletedFilm._id);
                setSavedMovies(updatedMoviesList);

            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            });
    }

    function getSavedMovies() {
        mainApi.getSavedMovies()
            .then((res) => {
                const savedMovies = res.filter((movie) => movie.owner === currentUser._id);
                setSavedMovies(savedMovies);
                setSavedMoviesList(savedMovies);
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            });
    }

    function handleSearchSavedMovie(req) {
        setIsPreloader(true);
        const searchMovies = savedMovies.filter((item) =>
            item.nameRU.toLowerCase().includes(req.toLowerCase()));

        if (searchMovies.length === 0) {
            setPopupText('По вашему запросу ничего не найдено');
            setInfoToolTip(true);
            setIsPreloader(false);
        } else {
            setSavedMovies(searchMovies);
            setIsPreloader(false);
        }
    }

    function handleCheckboxSavedMovies(checkbox) {
        if (checkbox) {
            setSavedMovies(savedMovies.filter((item) => item.duration <= SHORT_MOVIE));
        } else if (!checkbox) {
            setSavedMovies(savedMoviesList);
        }
    }

    const handleInfoTooltip = () => {
        setInfoToolTip(true)
    }

    const closeAllPopups = () => {
        setInfoToolTip(false)
    }

    function handleUpdateProfile({name, email}) {

        setIsLoading(true);
        mainApi.updateUserInfo({name, email})
            .then((res) => {
                setCurrentUser({
                    name: res.name,
                    email: res.email
                });
                setPopupText('Вы успешно изменили данные!');
                setInfoToolTip(true);
            })

            .catch((err) => {
                setPopupText('Что-то пошло не так! Попробуйте ещё раз.');
                setInfoToolTip(true);
            })
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
            <div className="app__container">
                {useRouteMatch(noHeader)
                    ? null
                    : (<Header isLoggedIn={isLoggedIn} />)
                }
                <Switch>

                    <Route exact path="/">
                        <Main />
                    </Route>

                    <Route path="/signup">
                        {!isLoggedIn
                            ? (
                                <Register onRegister={handleRegister}
                                          isLoading={isLoading}/>
                            )
                            : <Redirect to="/"/>
                        }
                    </Route>

                    <Route path="/signin">
                        {!isLoggedIn
                            ? (
                                <Login onLogin={handleLogin}
                                       isLoading={isLoading}/>
                        )
                            : <Redirect to="/"/>
                        }
                    </Route>

                    <ProtectedRoute path="/movies"
                                    isLoggedIn={isLoggedIn}
                                    component={Movies}
                                    onSearch={handleSearchMovies}
                                    foundMovies={foundMovies}
                                    onSaveMovie={handleSaveMovie}
                                    onDeleteMovie={handleDeleteStartMovie}
                                    savedMovies={savedMovies}
                                    onSubmitCheckbox={handleCheckboxMovies}
                                    preloaderTime={isPreloader}
                    />
                    <ProtectedRoute path="/saved-movies"
                                    isLoggedIn={isLoggedIn}
                                    component={SavedMovies}
                                    onSearch={handleSearchSavedMovie}
                                    onSaveMovie={handleSaveMovie}
                                    onDeleteMovie={handleDeleteMovie}
                                    savedMovies={savedMovies}
                                    onSubmitCheckbox={handleCheckboxSavedMovies}
                                    preloaderTime={isPreloader}
                    />
                    <ProtectedRoute path="/profile"
                                    isLoggedIn={isLoggedIn}
                                    component={Profile}
                                    onUpdateProfile={handleUpdateProfile}
                                    isLoading={isLoading}
                                    onSignOut={handleSignOut}
                    />
                    <Route path="/404">
                        <NotFound />
                    </Route>
                    <Redirect to="/404" />
                </Switch>
                {useRouteMatch(noFooter)
                    ? null
                    : (<Footer />)}
                <InfoToolTip
                    isOpen={infoToolTip}
                    onClose={closeAllPopups}
                    text={popupText}
                />
            </div>
        </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
