import React from 'react';

import {
    Redirect,
    Route,
    Switch,
    useRouteMatch,
} from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
// import Popup from '../Popup/Popup';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(true);
    const [isMenuShown, setIsMenuShown] = React.useState(false);

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

    const toggleMenu = () => {
        if (isMenuShown) {
            setIsMenuShown(false);
        } else setIsMenuShown(true);
    };

    return (
        <div className="app">
            <div className="app__container">
                {useRouteMatch(noHeader)
                    ? null
                    : (<Header isLoggedIn={true} />)
                }
                <Switch>
                    <Route
                        exact path="/"
                        component={ Main }
                    />
                    <Route
                        path="/signup"
                        component={ Register }
                    />
                    <Route
                        path="/signin"
                        component={ Login }
                    />
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
