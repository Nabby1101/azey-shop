import React, { Component } from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import Register from '../components/Other/Register'

export class RegisterPage extends Component {
  render() {
    return (
      <div id='all' className=''>
        <Header />
        <Register />
        <Footer />
      </div>
    )
  }
}

export default RegisterPage