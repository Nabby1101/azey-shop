import React from 'react';
import { useHistory } from 'react-router-dom';

/**     Xet trang thai login */

const PrivateRoute = ({ children }) => {

    const isLogged =
        JSON.parse(localStorage.getItem('userInfo')) !== null
            ? true
            : false;

    const history = useHistory();

    return (
        <div>
            {isLogged ? children : history.push('/login')}
        </div>
    );
    
};

export default PrivateRoute;