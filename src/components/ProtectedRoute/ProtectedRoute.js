import {Route, Redirect} from 'react-router-dom';
import React, {useEffect, useState} from 'react';

const ProtectedRoute = ({component: Component, ...props}) => {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      setIsLoggedIn(false);
    }
  }, []);

  return (
      <Route>
        {
          () => isLoggedIn ? <Component {...props} /> : <Redirect to="/"/>
        }
      </Route>
  )
}

export default ProtectedRoute;