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
// import moviesApi from "../../utils/MoviesApi";
// import mainApi from "../../utils/MainApi";
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

    // const toggleMenu = () => {
    //     if (isMenuShown) {
    //         setIsMenuShown(false);
    //     } else setIsMenuShown(true);
    // };


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


    return (
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
                        <Register onRegister={handleRegister} isLoading={isLoading}/>
                    </Route>

                    <Route path="/signin">
                        <Login onLogin={handleLogin} isLoading={isLoading}/>
                    </Route>

                    <Route
                        path="/movies"
                        component={ Movies }
                    />
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
    );
}

export default App;
