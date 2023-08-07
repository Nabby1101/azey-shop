import React, { Component } from 'react';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import Error from '../layouts/error';

export class DetailNewsPage extends Component {
    render() {
        return (
            <div id='all' className=''>
                <Header />
                <Error />
                <Footer />
            </div>

        )
    }
}

export default DetailNewsPage