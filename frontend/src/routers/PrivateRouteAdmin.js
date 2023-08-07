import React from 'react';
import { useHistory } from 'react-router-dom';

/**     Xet role user */

const PrivateRouteAdmin = ({ children }) => {

    const isAdmin =
        JSON.parse(localStorage.getItem('userInfo')) !== null
            ? JSON.parse(localStorage.getItem('userInfo')).role === 0
                ? true
                : false
            : false;

    const history = useHistory();
    
    return (
        <div>
            {isAdmin ? children : history.push('/error')}
        </div>
    );
    
};

export default PrivateRouteAdmin;