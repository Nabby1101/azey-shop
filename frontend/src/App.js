import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import AppRoute from './routers/AppRoute';
import { connect } from 'react-redux';

// import { ScrollToTop } from './components/Scroll/ScrollToTop';

// function App(props) {
function App() {
    const notify = () =>
        toast.success(JSON.parse(localStorage.getItem('message-user')).message);
    const clearMess = () => {
        localStorage.removeItem('message-user');
    };
    useEffect(() => {
        if (localStorage.getItem('message-user')) {
            notify();
            setTimeout(clearMess, 5000);
        } else {
            clearTimeout(clearMess);
        }
    }, []);

    return (
        <BrowserRouter>
            <div className='' id='all'>
                <ToastContainer />
                {/* {props.user.isAdmin  ? <AppRoute /> : <AppRoute2 />} */}
                <AppRoute />
            </div>
        </BrowserRouter>
    );
}

// const mapStateToProps = state => ({
//     user: state.user

// });

// export default connect(mapStateToProps, {})(App)

export default App;