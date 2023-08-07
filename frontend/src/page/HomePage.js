import React, { Component } from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import Home from '../components/Home/Home'

export class HomePage extends Component {
  render() {
    return (
        <div id="all" class="">
            <Header />
            <Home />
            <Footer />
        </div>
    )
  }
}

export default HomePage