import React, { Component } from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import About from '../components/Other/About'

export class AboutPage extends Component {
  render() {
    return (
      <div id='all' className=''>
        <Header />
        <About />
        <Footer />
      </div>
    )
  }
}

export default AboutPage