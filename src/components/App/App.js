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

function App() {
    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = React.useState(true);
    const [isMenuShown, setIsMenuShown] = React.useState(false);
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

    useEffect(() => {
        tokenCheck();
    }, []);

    useEffect(() => {
        if (!localStorage.getItem("jwt")) {
            handleSignOut();
        }
    }, []);

    function handleRegister({name, password, email}) {

        setIsLoading(true);
        auth.register({name, password, email})
            .then(() => {

                handleLogin({password, email});
                history.push('/movies');
            })
            .catch((err) => {

                console.log(`Ошибка ${err}`);
            });
    }
    function handleLogin({password, email}) {

        auth.authorize({password, email})
            .then((res) => {
                if (res.token) {
                    setIsLoggedIn(true);
                    localStorage.setItem("jwt", res.token);
                    history.push('/movies');
                }
            })
            .catch((err) => {

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
        history.push("/");
    }
// Поиск фильмов
    function handleSearchMovies(movie, checked) {

        if (allMovies.length !== 0) {
            const searchMovies = allMovies.filter((item) =>
                item.nameRU.toLowerCase().includes(movie.toLowerCase()));

                localStorage.setItem("searchedMovies", JSON.stringify(searchMovies));
                localStorage.setItem("searchWord", movie);
                localStorage.setItem("checkboxStatus", JSON.stringify(checked));

                setFoundMovies(searchMovies);
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

                        localStorage.setItem("loadedMovies", JSON.stringify(findMovies));
                        setAllMovies(findMovies);
                        localStorage.setItem("searchedMovies", JSON.stringify(searchMovies));
                        localStorage.setItem("searchWord", movie);
                        localStorage.setItem("checkboxStatus", JSON.stringify(checked));

                        setFoundMovies(searchMovies);
                })
                .catch((err) => {
                    console.log(`Ошибка ${err}`);
                })
                .finally(() => setIsPreloader(false));
        }
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
                        <Register onRegister={handleRegister}
                                  isLoading={isLoading}/>
                    </Route>

                    <Route path="/signin">
                        <Login onLogin={handleLogin}
                               isLoading={isLoading}/>
                    </Route>

                    <Route path="/movies">
                        <Movies onSearch={handleSearchMovies}
                                foundMovies={foundMovies}
                                preloaderTime={isPreloader}/>
                    </Route>
                    <Route
                        path="/saved-movies"
                        component={ SavedMovies }

                    />
                    <Route
                        path="/profile"
                        component={ Profile }
                    />
                    <Route
                        path="/404"
                        component={ NotFound }
                    />
                    <Redirect to="/404" />
                </Switch>
                {useRouteMatch(noFooter)
                    ? null
                    : (<Footer />)}
            </div>
        </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
