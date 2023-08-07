import React, { Component } from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import Contact from '../components/Other/Contact'

export class ContactPage extends Component {
  render() {
    return (
      <div id='all' className=''>
        <Header />
        <Contact />
        <Footer />
      </div>
    )
  }
}

export default ContactPage