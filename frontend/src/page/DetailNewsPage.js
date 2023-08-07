import React, { Component } from 'react';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import DetailNews from '../components/Other/DetailNews';

export class DetailNewsPage extends Component {
    render() {
        return (
            <div id='all' className=''>
                <Header />
                <DetailNews />
                <Footer />
            </div>

        )
    }
}

export default DetailNewsPage